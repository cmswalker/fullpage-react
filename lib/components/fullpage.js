import React from 'react';
import ScrollSwipe from 'scroll-swipe';

import * as utils from '../utils/index.js';
import Slide from './slide';
import HorizontalSlider from './horizontalSlider';

const { constants, scrollTo, renderUtils, INTENT_MAP, getNodes, showAll, hideAllButActive } = utils;
const { noOp } = constants;
const { KEY_IDX } = renderUtils;

let _fp = {};
let global = {};

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

    if (p.infinite && p.resetSlides) {
      throw new Error('Fullpage Component cannot have both infinite and resetSlides as truthy props');
    }

    const { slides, window } = p;

    if (!slides || !slides.length) {
      throw new Error('Please provide slides for Fullpage');
    }

    if (window) {
      global.window = window;
      global.document = global.window.document;
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

    this.name = 'Fullpage';
    const activeSlide = p.activeSlide || 0;
    this.scrollSensitivity = p.scrollSensitivity || 10;
    this.touchSensitivity = p.touchSensitivity || 10;

    this.scrollSpeed = p.scrollSpeed || 500;

    this.node = null;
    this.ss = null;
    this.verticalRoot = determineVerticalRoot();

    this.onHorizontalChange = p.onHorizontalChange || noOp;
    this.onSlideChangeStart = p.onSlideChangeStart || noOp;
    this.onSlideChangeEnd = p.onSlideChangeEnd || noOp;

    this.onScrollAction = this.onScrollAction.bind(this);
    this.onVerticalScroll = this.onVerticalScroll.bind(this);
    this.onHorizontalScroll = this.onHorizontalScroll.bind(this);
    this.resize = this.resize.bind(this);
    this.isLocked = false;
    this.handleScroll = this.handleScroll.bind(this);
    this.hSlideCache = {};
    this.cacheHslide = (slide) => {
      this.hSlideCache[slide.name] = slide;
    }

    _fp = this;

    this.state = Object.assign({
      scrollPending: false,
      window: null,
      document: null
    }, horizontals, generateState(activeSlide))
  }

  componentDidMount() {
    if (!global.window) {
      global.window = window || this.props.window || null;
      global.document = global.window ? global.window.document : null;
    }

    if (!global.window) {
      throw new Error('Window is not available at componentDidMount, please provide a stub and pass window into props when available');
    }

    this.setState({
      window: global.window,
      document: global.document
    }, () => {
      this.init.call(this);
    });
  }

  init() {
    const { window } = this.state;
    window.addEventListener('resize', this.resize.bind(this, window));
    this.resize(window);
  }

  hideScrollBars() {
    const { hideScrollBars } = this.props;
    const { document } = this.state;

    if (hideScrollBars && !this.isWithinBreakpoint.call(this)) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
  }

  showScrollBars() {
    const { document } = this.state;
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }

  lockScroll() {
    const node = this.node;
    const { enableArrowKeys } = this.props;

    if (enableArrowKeys) {
      window.addEventListener('keydown', this.checkKey.bind(this));
    }

    const ss = new ScrollSwipe({
      target: node,
      scrollSensitivity: this.scrollSensitivity * 3,
      touchSensitivity: this.touchSensitivity * 3,
      scrollPreventDefault: true,
      touchPreventDefault: true,
      scrollCb: this.onScrollAction,
      touchCb: this.onScrollAction
    });
    this.ss = ss;
    this.isLocked = true;
  }

  unlockScroll() {
    const { enableArrowKeys } = this.props;
    const ss = this.ss || ssStub();
    ss.killAll();
    this.ss = null;

    if (enableArrowKeys) {
      window.removeEventListener('keydown', this.checkKey.bind(this));
    }
    this.isLocked = false;
  }

  isWithinBreakpoint() {
    const { breakpoint } = this.props;

    if (!breakpoint) {
      return false;
    }

    const innerWidth = this.state.window.innerWidth || Infinity;
    return breakpoint && breakpoint >= innerWidth;
  }

  resize(window) {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const within = this.isWithinBreakpoint.call(this);

    if (within && this.isLocked) {
      this.unlockScroll.call(this);
      return;
    }

    if (!within && !this.isLocked) {
      this.lockScroll.call(this);
    }
  }

  onScrollAction({direction, intent, startEvent}) {
    const s = this.state;
    const ss = this.ss || ssStub();

    if (s.scrollPending) {
      return ss.listen();
    }

    const dir = INTENT_MAP[direction];

    // at this point we are dedicating
    if (direction === 'VERTICAL') {
      return this.onVerticalScroll(dir[intent], startEvent);
    }

    const { path } = startEvent;
    const isHorizontal = path.find((p) => {
      if (!p.dataset) {
        return false;
      }

      return p.dataset.slide === 'HorizontalSlider';
    });

    if (!isHorizontal) {
      return ss.listen();
    }

    this.onHorizontalScroll(dir[intent], isHorizontal);
  }

  onVerticalScroll(intent) {
    const s = this.state;
    const { window, document, activeSlide } = s;
    const { slides } = this.props;

    const next = intent === 'DOWN' ? activeSlide + 1 : activeSlide - 1;
    if (next < 0 || next > slides.length - 1) {
      const ss = this.ss || ssStub();
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

    const comp = _fp.hSlideCache[name];
    const hp = comp.props;
    const { infinite } = hp;

    let nodes = getNodes(this.state.document, `data-horizontal-slider="${name}"`);

    let leftVal = activeSlide * innerWidth;
    let to = next * innerWidth;

    const result = this.determineHSlide(comp, activeSlide, next, leftVal, to, nodes);

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
    const ss = this.ss || ssStub();

    const len = nodes.length;

    const infStart = activeSlide === 0 && next === -1;
    const infEnd = activeSlide === len - 1 && next === len;

    if (!infinite && !resetSlides && (infStart || infEnd)) {
      return ss.listen();
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
        }, 200);
      });
    });
  }

  componentWillUnmount() {
    const ss = this.ss || ssStub();
    ss.killAll();
    this.ss = null;

    const { window } = this.state;

    window.removeEventListener('resize', this.resize.bind(this));
    if (this.props.enableArrowKeys) {
      window.removeEventListener('keydown', this.checkKey.bind(this));
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

    // TODO: NOW IMPLEMENT THIS ON BUTTON CLICKS DOWN LOW
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
    const t = _fp;
    const { props, state } = t;
    const { activeSlide, window, document } = state;

    const eligible = isElibile(idx, props, state);

    if (!eligible) {
      return;
    }

    const newState = {
      activeSlide: idx,
      lastActive: activeSlide
    };

    const to = idx * window.innerHeight;

    t.setState({ scrollPending: true }, () => {
      t.handleScroll(t.verticalRoot, 'scrollTop', to, newState, t.name);
    });
  }

  render() {
    const s = this.state;
    const p = this.props;
    const { window, document } = s;

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

    return (
      <div ref={node => this.node = node} className='Fullpage'>
        {children}
        {other.map((o, i) => {
          const op = o.props || {};
          return <div key={i} {...op}></div>
        })}

        {slides.map((sl, i) => {
          const sp = sl.props || {};
          const children = sp.children;

          if (sp.slides) {
            const { name } = sp;
            return <HorizontalSlider cache={this.cacheHslide.bind(this)} window={window} document={document} activeSlide={s[name].activeSlide} hideScrollBars={p.hideScrollBars} {...sp} key={i}>{children}</HorizontalSlider>
          }

          return <Slide render={true} className={sp.className || ''} id={sp.id} window={window} document={document} key={i} {...sp}>{children}</Slide>
        })}
      </div>
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

  if (typeof navigator !== 'undefined' && navigator) {
    agent = navigator.userAgent;
  }

  if (!agent) {
    return document.body;
  }

  const { name, version, os } = utils.detectBrowser(agent);
  const [ major, minor, patch ] = version.split('.');

  // firefox
  if (name === 'firefox') {
    return document.documentElement;
  }

  // canary + newer chrome
  if (name === 'chrome' && Number(major) > 60) {
    return document.documentElement;
  }

  // safari, old chrome, etc
  return document.body;
}
export default Fullpage;
