const React = require('react');
const classNames = require('classnames');

const TopNav = require('./topNav');
const SideNav = require('./sideNav');
const scrollTo = require('../utils/scrollTo');
require('./styles.css');

let topNavOptions = {
  bottom: false,
  side: 'right',
  slides: [0,1,2]
};

let sideNavOptions = {
  side: 'right',
  slides: [0,1,2]
};

class Fullpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [],
      slidesCount: this.props.children.length || 0,
      activeSlide: 0,
      lastActive: -1,
      downThreshold: -Math.abs(100),
      upThreshold: 100,
      touchStart: 0,
      touchSensitivity: 250,
      scrollPending: false
    }
  }

  componentDidMount() {
    document.addEventListener('wheel', this.onScroll.bind(this));
    document.addEventListener('touchstart', this.onTouchStart.bind(this));
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));

    //initialize slides
    this.onResize();
    this.scrollToSlide(0);
  }

  componentWillUnmount() {
    document.removeEventListener('wheel', this.onScroll);
    document.removeEventListener('touchstart', this.onTouchStart);
    document.removeEventListener('touchend', this.onTouchEnd);
    window.removeEventListener('resize', this.onResize);
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
  }

  scrollToSlide(slide) {
    console.log('scroll to', slide);
    if (slide === this.state.slidesCount) {
      return this.setState({
        'activeSlide': slide
      });
    }
    //slide is idx
    if (slide >= 0 && slide < this.state.slidesCount) {
      this.setState({
        'activeSlide': slide
      });

      this.setState({'scrollPending': true});

      var self = this;
      scrollTo(document.body, this.state.slides[slide], 600, function() {
        self.setState({'activeSlide': slide});
        self.setState({'scrollPending': false});
      });
    }
  }

  onTouchStart(e) {
    this.setState({'touchStart': e.touches[0].clientY});
  }

  onTouchEnd(e) {
    const touchEnd = e.changedTouches[0].clientY;

    if (this.touchStart > touchEnd + this.touchSensitivity) {
      this.scrollToSlide(this.state.activeSlide + 1);
    } else if (this.touchStart < touchEnd - this.touchSensitivity) {
      this.scrollToSlide(this.state.activeSlide - 1);
    }
  }

  onArrowClick() {
    this.scrollToSlide(this.state.activeSlide + 1);
  }

  onScroll(e) {
    e.preventDefault();
    if (this.state.scrollPending) {
      return;
    }

    const scrollDown = (e.wheelDelta || -e.deltaY || e.detail) < this.state.downThreshold;
    const scrollUp = (e.wheelDelta || e.deltaY || e.detail) > this.state.upThreshold;

    let activeSlide = this.state.activeSlide;

    if (scrollDown) {
      if (activeSlide == this.state.slidesCount -1) {//down going down
        return this.setState({'scrollPending': false});
      }

      activeSlide = activeSlide + 1;

    } else if (scrollUp) {
        if (!activeSlide) {//up going up
          return this.setState({'scrollPending': false});
        }

        activeSlide = activeSlide - 1;
    } else {
      return this.setState({'scrollPending': false});
    }

    this.setState({'scrollPending': true});

    var self = this;
    scrollTo(document.body, this.state.slides[activeSlide], 500, function() {
      self.setState({'activeSlide': activeSlide});
      self.setState({'lastActive': scrollDown ? activeSlide-- : activeSlide++});

      setTimeout(function() {
        self.setState({'scrollPending': false})
      }, (self.state.upThreshold * 2));
    });
    return this.setState({'scrollPending': true});
  }

  render() {
    let classes = classNames({
      'fullpage-react': true
    });

    return (
      <div className={classes} style={{height: this.state.height}}>
        <TopNav {...topNavOptions} goToSlide={this.scrollToSlide.bind(this)}></TopNav>

        {this.props.children}

        <SideNav {...sideNavOptions} goToSlide={this.scrollToSlide.bind(this)}></SideNav>
      </div>
    );
  }
};
Fullpage.propTypes = {
  children: React.PropTypes.node.isRequired
}

module.exports = Fullpage;
