const React = require('react');
const scrollTo = require('../utils/scrollTo');

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
    return (
      <div style={{height: this.state.height}}>
        {this.props.children}
      </div>
    );
  }
};
Fullpage.propTypes = {
  children: React.PropTypes.node.isRequired
},

module.exports = Fullpage;
