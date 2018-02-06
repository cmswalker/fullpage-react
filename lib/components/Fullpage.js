import React from 'react';
import ScrollSwipe from 'scroll-swipe';
import root from 'window-or-global';
import { WindowSize } from 'react-fns';

import { detectBrowser, constants, scrollTo, renderUtils, INTENT_MAP, getNodes, showAll, hideAllButActive, composedPath } from '../utils';
import Slide from './Slide';
import HorizontalSlider from './HorizontalSlider';

const { noOp } = constants;
const { KEY_IDX } = renderUtils;

let _fp = {};
let global = {};

const TIMEOUT = 200;

const documentStub = () => {
  const style = {};
  return {
    querySelectorAll: () => [<div></div>],
    documentElement: {
      style
    },
    body: {
      style
    }
  };
}

function generateState(activeSlide = 0) {
  return {
    activeSlide,
    lastActive: activeSlide - 1
  };
}

class Fullpage extends React.Component {
  constructor(props) {
    super(props);
    const p = this.props;

    global.window = root;
    global.document = global.window.document || documentStub();

    if (p.infinite && p.resetSlides) {
      throw new Error('Fullpage Component cannot have both infinite and resetSlides as truthy props');
    }

    const { slides } = p;

    if (!slides || !slides.length) {
      throw new Error('Please provide slides for Fullpage');
    }

    let horizontalMap = {};
    // generate state for horizontals;
    const horizontals = slides.reduce((result, s, i) => {
      const { name } = s.props;

      if (s.props.slides && name) {
        result[name] = generateState(0);
        horizontalMap[i] = name;
      }

      return result;
    }, {});
    horizontals.horizontalMap = horizontalMap;

    const { activeSlide = 0, scrollSensitivity, touchSensitivity, scrollSpeed = 500 } = p;

    this.name = 'Fullpage';
    this.scrollSensitivity = scrollSensitivity;
    this.touchSensitivity = touchSensitivity;
    this.scrollSpeed = scrollSpeed;

    this.node = null;
    this.ss = null;
    this.verticalRoot = determineVerticalRoot();

    this.onHorizontalChange = p.onHorizontalChange || noOp;
    this.onSlideChangeStart = p.onSlideChangeStart || noOp;
    this.onSlideChangeEnd = p.onSlideChangeEnd || noOp;

    ['onScrollAction', 'onVerticalScroll',
    'onHorizontalScroll', 'lockScroll', 'handleScroll',
    'checkKey'].forEach(f => this[f] = this[f].bind(this));

    this.isLocked = false;
    this.hSlideCache = {};
    this.cacheHslide = (slide) => {
      this.hSlideCache[slide.name] = slide;
    }

    _fp = this;

    this.state = Object.assign({
      scrollPending: false,
      window: null,
      document: null
    }, horizontals, generateState(activeSlide));
  }

  componentDidMount() {
    this.hideScrollBars();

    this.window = global.window;
    this.document = global.document;

    this.setState({
      window: global.window,
      document: global.document
    }, () => {
      this.lockScroll();
    });
  }

  hideScrollBars() {
    const { hideScrollBars } = this.props;

    if (!hideScrollBars) {
      return;
    }

    const { document } = global;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  showScrollBars() {
    const { document } = global;
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }

  lockScroll() {
    const { node, checkKey } = this;
    const { enableArrowKeys } = this.props;

    if (enableArrowKeys) {
      window.addEventListener('keydown', checkKey.bind(this));
    }

    const ss = new ScrollSwipe({
      target: node,
      scrollSensitivity: this.scrollSensitivity,
      touchSensitivity: this.touchSensitivity,
      scrollPreventDefault: true,
      touchPreventDefault: true,
      scrollCb: this.onScrollAction,
      touchCb: this.onScrollAction
    });
    this.ss = ss;
    this.isLocked = true;
  }

  onScrollAction({direction, intent, startEvent}) {
    const s = this.state;
    const { ss = ssStub() } = this;

    if (s.scrollPending) {
      ss.flush();
      return ss.listen();
    }

    const dir = INTENT_MAP[direction];

    // at this point we are dedicating
    if (direction === 'VERTICAL') {
      return this.onVerticalScroll(dir[intent], startEvent);
    }

    let path = startEvent.path || startEvent.composedPath();

    if (!path) {
      const polyFillPath = composedPath(startEvent.target);
      path = polyFillPath;
    }

    const isHorizontal = path.find((p) => {
      if (!p.dataset) {
        return false;
      }

      return p.dataset.slide === 'HorizontalSlider';
    });

    if (!isHorizontal) {
      ss.flush();
      return ss.listen();
    }

    this.onHorizontalScroll(dir[intent], isHorizontal);
  }

  onVerticalScroll(intent) {
    const s = this.state;
    const { window, activeSlide } = s;
    const { slides } = this.props;

    const next = intent === 'DOWN' ? activeSlide + 1 : activeSlide - 1;
    if (next < 0 || next > slides.length - 1) {
      const { ss = ssStub() } = this;
      ss.flush();
      return ss.listen();
    }

    const to = next * window.innerHeight;
    const newState = {
      activeSlide: next,
      lastActive: activeSlide
    };

    this.setState({ scrollPending: true }, () => {
      this.handleScroll(this.verticalRoot, 'scrollTop', to, newState, this.name);
    });
  }

  onHorizontalScroll(intent, node) {
    const { name } = node.dataset;
    let { activeSlide } = this.state[name];
    let next = intent === 'RIGHT' ? activeSlide + 1 : activeSlide - 1;
    const { innerWidth } = this.state.window;
    const { ss = ssStub() } = this;

    const comp = _fp.hSlideCache[name];
    const hp = comp.props;
    const { infinite } = hp;

    let nodes = getNodes(this.state.document, `data-horizontal-slider="${name}"`);

    let leftVal = activeSlide * innerWidth;
    let to = next * innerWidth;

    const result = this.determineHSlide(comp, activeSlide, next, leftVal, to, nodes);

    if (!result) {
      setTimeout(() => {
        ss.flush();
        ss.listen();
      }, TIMEOUT);
      return;
    }

    leftVal = result.leftVal
    next = result.next;
    to = result.to;

    const newState = {
      [name]: {
        activeSlide: next,
        lastActive: activeSlide
      }
    };

    this.handleHorizontal(name, node, nodes, leftVal, to, next, newState, infinite);
  }

  determineHSlide(comp, activeSlide, next, leftVal, to, nodes) {
    const hp = comp.props;
    const { infinite, resetSlides } = hp;
    const { innerWidth } = this.state.window;

    const len = nodes.length;

    const infStart = activeSlide === 0 && next === -1;
    const infEnd = activeSlide === len - 1 && next === len;

    if (!infinite && !resetSlides && (infStart || infEnd)) {
      return null;
    }

    if (infinite && infStart) {
      // simulate last <- 0
      next = len - 1;
      lastToFirst(nodes);
      leftVal = innerWidth;
      to = 0;
    } else if (infinite && infEnd) {
      // simulate last -> 0
      next = 0;
      lastToFirst(nodes);
      leftVal = 0;
      to = innerWidth;
    }

    const result = { next, leftVal, to };
    return result;
  }

  handleHorizontal(name, node, nodes, leftVal, to, next, newState, infinite) {
    showAll(nodes);
    node.scrollLeft = leftVal;

    //show, reset window
    //scroll
    //hide

    this.setState({ scrollPending: true }, () => {
      this.handleScroll(node, 'scrollLeft', to, newState, name, () => {
        if (infinite) {
          firstToLast(nodes);
          node.scrollLeft = innerWidth * next;
        }
        hideAllButActive(next, nodes);
      });
    });
  }

  handleScroll(node, winProp, to, newState, compName, cb = noOp) {
    const ss = this.ss || ssStub();
    ss.flush();
    this.onSlideChangeStart(compName, this.props, this.state, newState[compName] || newState);

    scrollTo(node, winProp, to, this.scrollSpeed, () => {
      newState.scrollPending = false;
      this.setState(newState, () => {
        cb();
        this.onSlideChangeEnd(compName, this.props, this.state, newState[compName] || newState);
        setTimeout(() => {
          ss.flush();
          ss.listen();
        }, TIMEOUT);
      });
    });
  }

  componentWillUnmount() {
    const ss = this.ss || ssStub();
    ss.killAll();
    this.ss = null;

    const { window } = this.state;

    if (this.props.enableArrowKeys) {
      window.removeEventListener('keydown', this.checkKey);
    }
  }

  checkKey(e) {
    const direction = KEY_IDX[e.keyCode];
    if (!direction) {
      return;
    }

    const intent = (direction === 'UP' || direction === 'LEFT') ? -1 : 1;
    const context = (direction === 'UP' || direction === 'DOWN') ? 'VERTICAL' : 'HORIZONTAL';

    if (context === 'VERTICAL') {
      Fullpage.changeFullpageSlide(this.state.activeSlide + intent);
      return;
    }

    const horizontalName = this.state.horizontalMap[this.state.activeSlide];
    if (!horizontalName) {
      return;
    }

    const { activeSlide } = this.state[horizontalName];
    Fullpage.changeHorizontalSlide(horizontalName, activeSlide + intent);
  }

  static changeHorizontalSlide(name, next) {
    next = +next;

    const comp = _fp.hSlideCache[name];
    if (!comp) {
      throw Error('cannt find HorizontalSlider by name', name);
    }

    const { node, props } = comp;
    const { infinite } = props;
    const eligible = isElibile(next, props, _fp.state);

    if (!eligible) {
      return;
    }

    const { activeSlide } = _fp.state[name];

    let nodes = getNodes(_fp.state.document, `data-horizontal-slider="${name}"`);
    let leftVal = activeSlide * innerWidth;
    let to = next * innerWidth;

    const result = _fp.determineHSlide.call(_fp, comp, activeSlide, next, leftVal, to, nodes);

    leftVal = result.leftVal
    next = result.next;
    to = result.to;

    const newState = {
      [name]: {
        activeSlide: next,
        lastActive: activeSlide
      }
    };

    _fp.handleHorizontal.call(_fp, name, node, nodes, leftVal, to, next, newState, infinite);
  }

  static changeFullpageSlide(idx) {
    const { props, state, name, verticalRoot } = _fp;
    const { activeSlide, window } = state;

    const eligible = isElibile(idx, props, state);

    if (!eligible) {
      return;
    }

    const newState = {
      activeSlide: idx,
      lastActive: activeSlide
    };

    const to = idx * window.innerHeight;

    _fp.setState({ scrollPending: true }, () => {
      _fp.onSlideChangeStart(name, props, state, newState);
      _fp.handleScroll(verticalRoot, 'scrollTop', to, newState, name);
    });
  }

  render() {
    const s = this.state;
    const p = this.props;
    const { window, document, activeSlide } = s;

    const children = p.children || null;

    if (!window) {
      return children;
    }

    const elements = p.slides.reduce((result, sl) => {
      if (!sl) {
        return result;
      }

      if (typeof sl.type !== 'function') {
        result.other.push(sl);
      } else {
        result.slides.push(sl);
      }

      return result;
    }, { slides: [], other: [] });

    const { other, slides } = elements;

    // TODO: sub other for children
    return (
        <WindowSize
          render={({ width, height }) => {

            const to = activeSlide * height;
            setTimeout(() => {
              this.verticalRoot.scrollTop = to;
            }, 0);

            return (
              <div ref={node => (this.node = node)} className="Fullpage">
                {children}
                {other.map((o, i) => {
                  const op = o.props || {};
                  return <div key={i} {...op} />;
                })}

                {slides.map((sl, i) => {
                  const sp = sl.props || {};
                  const children = sp.children;

                  if (sp.slides) {
                    const { name } = sp;
                    return <HorizontalSlider cache={this.cacheHslide.bind(this)} width={width} height={height} window={window} document={document} activeSlide={s[name].activeSlide} hideScrollBars={p.hideScrollBars} {...sp} key={i}>
                        {children}
                      </HorizontalSlider>;
                  }

                  return <Slide render={true} className={sp.className || ''} id={sp.id} width={width} height={height} key={i} {...sp}>
                      {children}
                    </Slide>;
                })}
              </div>
            );
          }}
        />
    );
  }
}

function swap(nodes, o, i) {
  nodes[o || i].parentNode.insertBefore(nodes[i], nodes[o]);
  return nodes;
}

function lastToFirst(nodes) {
  swap(nodes, 0, nodes.length - 1);
}

function firstToLast(nodes) {
  swap(nodes, null, nodes.length - 1);
}

function isElibile(idx, props, state) {
  const { slides } = props;
  const { activeSlide } = state;

  if (state.scrollPending) {
    return false;
  }

  if (props.infinite) {
    return true;
  }

  if (idx > slides.length - 1 || idx < 0) {
    return false;
  }

  if (idx == activeSlide) {
    return false;
  }

  return true;
}

function ssStub() {
  return {
    flush: noOp,
    killAll: noOp,
    listen: noOp
  };
}

function determineVerticalRoot() {
  let agent;

  const { document } = global;

  if (typeof navigator !== 'undefined' && navigator) {
    agent = navigator.userAgent;
  }

  if (!agent) {
    return document.body;
  }

  const browser = detectBrowser(agent);

  if (!browser) {
    return document.body;
  }

  // NOTE: various browsers and devTools handle this differently as the userAgent source of truth
  // To get the root scrollable element we have to play around with OS and browser to find the right
  // root to return. If need be we can be specific about version

  const { name, version, os } = browser;
  const [ major, minor, patch ] = version.split('.');

  const docElementSet = new Set([
    'firefox',
    'chrome',
    'crios' // chrome ios
  ]);

  if (docElementSet.has(name)) {
      return document.documentElement;
  }

  // safari, etc
  return document.body;
}
export default Fullpage;
