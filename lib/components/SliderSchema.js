const React = require('react');

/*
Need to 'reactify' this class
 */

class SliderSchema extends React.Component {
  constructor(props) {
    super(props)
    var p = this.props;

    console.log('schema props', p);
    // console.log('schema props', props);
    var originalChilren = Object.assign({}, p.slideArr);
    this.state = {
      originalChilren,
      node: p.node,
      navElements: p.navElements,
      fullpage: p.fullpage
    };

  }

  render() {
    console.log('1', this.props.children);
    return (
      <div style={{'height': '100%', 'width': '100%', 'overflowX': 'scroll', 'whiteSpace': 'nowrap', 'padding': 'none', 'margin': '0 auto'}}>
        {(this.props.children || []).map((child, idx) => {
          console.log(this.props.slideArr[idx])
          console.log('child here', child);
          return <div style={{
            width: '100%', display: 'inline-block',
            margin: '0 auto', padding: 'none',
            height: '100%'}} key={idx}>{child}</div>
        }, this)}
      </div>
    )
  }
}
function SliderSchema(node, children, navElements, fullpage) {

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


// var slider = new SliderSchema('slider');
// var sliderFull = new SliderSchema('slider-full', true);

function scrollTo(element, to, duration, callback) {
  var start = element.scrollLeft,
      change = to - start,
      currentTime = 0,
      increment = 10;

  animateScroll(callback);

  function animateScroll(callback) {
      currentTime += increment;
      var val = ease(currentTime, start, change, duration);

      element.scrollLeft = val;
      if (currentTime < duration) {
          setTimeout(function() {
            animateScroll(callback)
          }, increment);
      } else {
        return callback();
      }
  }
}

//t = current time
//b = start value
//c = change in value
//d = duration
function ease(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

module.exports = SliderSchema;
