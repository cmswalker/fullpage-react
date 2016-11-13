const React = require('react');
const ReactDOM = require('react-dom');

const Slide = require('./slide');

const scrollTo = require('../utils/scrollTo');
const events = require('../utils/events');
const renderUtils = require('../utils/renderUtils');

const CONSTS = require('./consts');
const SCROLL_DIR = CONSTS.SCROLL_DIRECTIONS.Y;

const {KEY_IDX} = renderUtils;
const {GET_BODY} = renderUtils;


class Fullpage extends React.Component {
  constructor(props) {
    super(props);

    let slideChildren = getSlideCount(this.props.children);

    this.state = {
      name: 'Fullpage',
      defaultClass: 'Fullpage',
      slides: [],
      slidesCount: slideChildren,
      activeSlide: 0,
      lastActive: -1,
      downThreshold: -Math.abs(this.props.threshold || 100),
      upThreshold: this.props.threshold || 100,
      touchStart: 0,
      touchSensitivity: this.props.sensitivity || 100,
      scrollPending: false
    };

    this.onScroll = this.onScroll.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.checkKey = this.checkKey.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    let fullPageNode = this.node;

    // fullPageNode.addEventListener('wheel', this.onScroll);
    fullPageNode.addEventListener('touchstart', this.onTouchStart);
    fullPageNode.addEventListener('touchend', this.onTouchEnd);
    fullPageNode.addEventListener('keydown', this.checkKey);

    window.addEventListener('resize', this.onResize);
    events.pub(this, this.scrollToSlide);

    //initialize slides
    this.onResize();
  }

  componentWillUnmount() {
    document.removeEventListener('wheel', this.onScroll);
    document.removeEventListener('touchstart', this.onTouchStart);
    document.removeEventListener('touchend', this.onTouchEnd);
    document.removeEventListener('keydown', this.checkKey);
    window.removeEventListener('resize', this.onResize);
  }

  shouldComponentUpdate(nP, nS) {
    return true;
  }

  componentDidUpdate(pP, pS) {
    events.active = this.state.activeSlide;
    this.props.active(this.state.activeSlide);
  }

  checkKey(e) {
    let direction = null;
    e = e || window.event;
    if (KEY_IDX[e.keyCode]) {
      direction = KEY_IDX[e.keyCode];
    } else {
      return false;
    }

    //can remove this when carousel is implemented
    if (typeof direction !== 'number') {
      return false;
    }

    this.scrollToSlide(this.state.activeSlide + direction);
  }

  onResize() {
    let slides = [];

    for (let i = 0; i < this.state.slidesCount; i++) {
      slides.push(window.innerHeight * i);
    }

    this.setState({
      'slides': slides,
      'height': window.innerHeight
    });

    this.scrollToSlide(this.state.activeSlide, true);
  }

  scrollToSlide(slide, override) {
    if (override) {
      return scrollTo.call(this, GET_BODY(), SCROLL_DIR, this.state.slides[slide], 100, () => {
        this.setState({'activeSlide': slide});
        this.setState({'scrollPending': false});
      });
    }

    if (this.state.scrollPending) {
      return;
    }

    if (slide < 0 || slide >= this.state.slidesCount) {
      return;
    }

    this.setState({
      'activeSlide': slide,
      'scrollPending': true
    });

    scrollTo(GET_BODY(), SCROLL_DIR, this.state.slides[slide], 600, () => {
      this.setState({'activeSlide': slide});
      this.setState({'scrollPending': false});
    });
  }

  onTouchStart(e) {
    this.setState({'touchStart': e.touches[0].clientY});
    e.preventDefault();
  }

  onTouchEnd(e) {
    const touchEnd = e.changedTouches[0].clientY;

    if (this.state.touchStart > (touchEnd + Math.abs(this.state.touchSensitivity)) ) {

      if (this.state.activeSlide == this.state.slidesCount - 1) {// prevent down going down
        return;
      }

      return this.scrollToSlide(this.state.activeSlide + 1);

    }

    if (this.state.activeSlide == 0) {// prevent up going up
      return;
    }

    this.scrollToSlide(this.state.activeSlide - 1);

  }

  onArrowClick() {
    this.scrollToSlide(this.state.activeSlide + 1);
  }

  onScroll(e) {
    handleScroll(e, this, SCROLL_DIR);
  }

  render() {
    return (
      <div ref={node => this.node = node} className={renderUtils.defaultClass.call(this)} style={{height: this.state.height, width: '100%', overflowY: 'hidden'}}>
        {  this.props.children.map((c, idx) => {
          return <div key={idx} style={Object.assign({}, {height: '100%', width: '100%', display: 'inline'})}>{c}</div>
        })  }
      </div>
    )
  }
}
Fullpage.propTypes = {
  children: React.PropTypes.node.isRequired,
  threshold: React.PropTypes.number,
  sensitivity: React.PropTypes.number,
  active: React.PropTypes.func
}

function getSlideCount(children) {
  return children.reduce((result, c) => {
    if (Array.isArray(c)) {
      return getSlideCount(c);
    }

    if (!c.type) {
      return result;
    }

    if (c.type === Slide) {
      return result = result + 1;
    }

    return result;
  }, 0)
}

function handleScroll(e, comp, axis) {
  e.preventDefault();
  console.log('called on fullpage main')
  return;//REMOVE
  if (comp.state.scrollPending) {
    return;
  }

  const direction = axis === CONSTS.SCROLL_DIRECTIONS.Y ? 'Y' : 'X';
  const scrollDown = (e.wheelDelta || -e[`delta${direction}`] || e.detail) < comp.state.downThreshold;
  const scrollUp = (e.wheelDelta || -e[`delta${direction}`] || e.detail) > comp.state.upThreshold;

  if (!scrollDown && !scrollUp) {
    return;
  }

  console.log('CALLED SCROLL ON FULLPAGE SLIDE');
  console.log('UP?', scrollUp);
  console.log('DOWN?', scrollDown)

  let activeSlide = comp.state.activeSlide;

  if (scrollDown) {
    if (activeSlide == comp.state.slidesCount -1) {// prevent down going down
      return comp.setState({'scrollPending': false});
    }

    activeSlide = activeSlide + 1;

  } else if (scrollUp) {
      if (!activeSlide) {// prevent up going up
        return comp.setState({'scrollPending': false});
      }

      activeSlide = activeSlide - 1;
  } else {
    return comp.setState({'scrollPending': false});
  }

  comp.setState({'scrollPending': true});

  scrollTo(GET_BODY(), SCROLL_DIR, comp.state.slides[activeSlide], 500, () => {
    comp.setState({'activeSlide': activeSlide});
    comp.setState({'lastActive': scrollDown ? activeSlide-- : activeSlide++});

    setTimeout(() => {
      comp.setState({'scrollPending': false})
    }, (comp.state.upThreshold * 2));
  });
  return comp.setState({'scrollPending': true});
}

module.exports = Fullpage;
