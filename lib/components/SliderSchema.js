const React = require('react');

const { scrollToSlide, resize } = require('../utils/scrollTo');
const events = require('../utils/events');
const renderUtils = require('../utils/renderUtils');
const { KEY_IDX, GET_BODY, GET_BROWSER, GET_OS} = renderUtils;
const scrollDirection = new(require('../utils/scrollDirection'));


var needsConversion = null;

class SliderSchema extends React.Component {
  constructor(props) {
    super(props);

    var p = this.props;
    var originalChilren = p.slideArr.slice(0);

    this.state = {
      downThreshold: p.downThreshold || 100,
      upThreshold: p.upThreshold || 100,
      activeSlide: 0,
      originalChilren,
      slides: p.slideArr || [],
      slideCount: originalChilren.length,
      node: p.node,
      navElements: p.navElements || {},
      fullpage: p.fullpage || true
    };

    this.onScroll = this.onScroll.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  componentDidMount() {
    const node = this.props.node || this.node;
    node.addEventListener('wheel', this.onScroll);
    node.addEventListener('touchmove', this.onTouchStart);
    node.addEventListener('touchend', this.onTouchEnd);
    node.addEventListener('keydown', this.checkKey);
    events.pub(this, scrollToSlide.bind(this));

    //override the threshold for windows firefox
    var b = GET_BROWSER();
    var os = GET_OS();
    if (b === 'Firefox' && os === 'WINDOWS') {
      needsConversion = true;
    }

    //init
    resize.call(this);
  }

  shouldComponentUpdate(nP, nS) {
    var p = this.props;
    var s = this.state;
    return (p.slideArr.length !== nP.slideArr.length) || (s.height !== nS.height);
  }

  onTouchStart(e) {
    e.preventDefault();
    var t = e.touches[0].clientY;

    scrollDirection.latestTouch = t;
    scrollDirection.addTouch(t);

    if (scrollDirection.touchFulfilled()) {
      this.setState({'touchStart': scrollDirection.getTouch(0)});
      scrollDirection.resetTouches();
    }
  }

  onTouchEnd(e) {
    var s = this.state;
    const touchEnd = e.changedTouches[0].clientY;
    const touchStart = s.touchStart;
    const sensitivity = s.touchSensitivity;

    //prevent standard taps creating false positives;
    if (scrollDirection.latestTouch !== touchEnd) {
      return;
    }

    if ((!touchStart) || touchStart > (touchEnd + Math.abs(sensitivity / 2)) ) {

      if (s.activeSlide == s.slideCount - 1) {// prevent down going down
        return;
      }

      return scrollToSlide.call(this, s.activeSlide + 1);
    }

    if (s.activeSlide == 0) {// prevent up going up
      return;
    }

    scrollToSlide.call(this, s.activeSlide - 1);
  }

  onArrowClick() {
    scrollToSlide.call(this, this.state.activeSlide + 1);
  }

  onScroll(e) {
    e.preventDefault();
    var s = this.state;

    if (s.scrollPending) {
      return;
    }

    var meas = (1 > 2) ? -e.deltaY : (e.wheelDelta || -e.deltaY || e.detail);
    //windows firefox produces very low wheel activity so we have to multiply it
    // if (needsConversion) {
    //   meas = meas * 3;
    // }

    const scrollDown =  meas < s.downThreshold;
    const scrollUp = !scrollDown && ( meas > s.upThreshold );

    if (!scrollDown && !scrollUp) {
      return this.setState({'scrollPending': false});
    }

    var activeSlide = s.activeSlide;

    if (scrollDown) {
      if (activeSlide === s.slideCount - 1) {// prevent down going down
        return this.setState({'scrollPending': false});
      }
      activeSlide++;
    } else if (scrollUp) {
        if (!activeSlide) {// prevent up going up
          return this.setState({'scrollPending': false});
        }
        activeSlide--;
    }

    const x = e.deltaX;
    const y = e.deltaY;

    scrollDirection.addXScroll(x);
    scrollDirection.addYScroll(y);

    scrollDirection.scrollFulfilled((fulfilled, direction) => {
      if (!fulfilled) {
        return;
      }

      console.log('fulfilled', direction)
      const SCROLL_DIRECTION = direction;
      this.setState({'lastActive': scrollDown ? activeSlide - 1 : activeSlide + 1});

      if (this.props.horizontal) {
        console.log('scrolled on hori', this);
      }

      console.log('-----------------------------------')
      scrollToSlide.call(this, activeSlide, SCROLL_DIRECTION);
    });
  }

  render() {
    var p = this.props;

    if (p.horizontal) {
      return (
        <div ref={node => this.node = node} style={{'height': '100%', 'width': '100%', 'overflowX': 'scroll', 'whiteSpace': 'nowrap', 'padding': 'none', 'margin': '0 auto'}}>
          {(p.children || []).map((child, idx) => {
            return <div style={{
              width: '100%', display: 'inline-block',
              margin: '0 auto', padding: 'none',
              height: '100%'}} key={idx}>{child}</div>
          }, this)}
        </div>
      )
    }

    return (
      <div ref={node => this.node = node} className={renderUtils.defaultClass.call(this)} style={{height: this.state.height || window.innerHeight}}>
        {p.children}
      </div>
    )

  }
}
function SliderSchemaFUnc(node, children, navElements, fullpage) {

 this.prev = navElements.prev;
 this.next = navElements.next;
 this.active = 0;
 this.fullpage = fullpage || false;

 this.slider = node;
 this.slides = children;
 this.originalSlides = Array.prototype.slice.call( this.slides );
 this.length = this.originalSlides.length;

 // var self = this;
 // this.prev.addEventListener('click', function() {
 //   back.call(self);
 // });
 //
 // this.next.addEventListener('click', function() {
 //   forward.call(self);
 // });

 // this.removeChildren = function() {
 //  while (this.slider.firstChild) {
 //    this.slider.removeChild(this.slider.firstChild);
 //  }
 // }
 //
 // this.mountFirst = function() {
 //   this.slider.appendChild(this.originalSlides[0])
 // }
 //
 // if (this.fullpage) {
 //   this.removeChildren();
 //   this.mountFirst();
 // }
}


function back() {
  var old = this.active;

  //prepend, scroll, then delete the first which is now last
  if (this.active == 0) {
    this.active = this.length - 1;
  } else {
    this.active = this.active - 1;
  }

  this.prepend(old, this.active);

  var last = this.slider.lastChild;
  var w = last.offsetWidth || 0;
  this.slider.scrollLeft = w;
  var self = this;
  scrollTo(this.slider, 0, 600, function() {
    if (self.fullpage) {
      self.slider.removeChild(self.slider.lastChild);
    }
  });
}

function forward() {
  //append, scroll, then delete the first
  var old = this.active;

  if (this.active == this.length - 1) {
    this.active = 0;
  } else {
    this.active = this.active + 1;
  }

  if (this.fullpage) {
    this.append(this.active);
  } else {
    this.append(old);
  }

  this.slider.scrollLeft = 0;

  var first = this.slider.firstChild;
  var w = first.offsetWidth || 0;

  var self = this;
  scrollTo(this.slider, w, 600, function() {
    if (self.fullpage) {
      self.slider.removeChild(self.slider.firstChild);
    }
    // callback
  });
}

SliderSchema.prototype.append = function(slide) {
  this.slider.appendChild(this.originalSlides[slide]);
}
SliderSchema.prototype.prepend = function(old, curr) {
  this.slider.insertBefore( this.originalSlides[curr], this.slider.firstChild );
}

module.exports = SliderSchema;
