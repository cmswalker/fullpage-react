import React from 'react';

import fpextension from 'fullpage.js/dist/jquery.fullpage.extensions.min';

class FullpageReact extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.$ || !this.props.$.prototype.jquery) {
      throw new Error('must provide jquery instance to fullpage-react');
    }

    if (!this.props.render) {
      throw new Error('must provide render prop to fullpage-react');
    }

    this.state = {
      initialized: false,
      anchorLink: undefined,
      index: this.props.index || 0
    };
  }

  componentDidMount() {
    const { $ } = this.props;
    const callbacks = ['afterLoad', 'onLeave', 'afterRender', 'afterResize', 'afterResponsive', 'afterSlideLoad', 'onSlideLeave'];
    const registered = callbacks.filter(key => !!this.props[key]);
    const listeners = registered.reduce((result, key) => {
      result[key] = (...args) => {
        const newArgs = [key, ...args];
        this.props[key](...newArgs)
        this.update(...newArgs);
      };

      return result;
    }, {});

    const finalOpts = Object.assign(
      {},
      this.props,
      listeners
    );

    $(document).ready(() => {
      $('#fullpage-react').fullpage(finalOpts);
      this.setState({
        initialized: true
      }, () => {
        this.mapMethods();
      });
    });
  }

  mapMethods() {
    const { $ } = this.props;
    const { responsiveSlides } = $.fn.fullpage;
    FullpageReact.responsiveSlides = {};

    // NOTE: remapping methods https://github.com/alvarotrigo/fullPage.js#methods
    [
      'moveSectionUp', 'moveSectionDown', 'moveTo', 'silentMoveTo', 'moveSlideRight', 'moveSlideLeft', 'setAutoScrolling', 'setFitToSection',
      'fitToSection', 'setLockAnchors', 'setAllowScrolling', 'setKeyboardScrolling', 'setRecordHistory', 'setScrollingSpeed', 'destroy', 'reBuild', 'setResponsive'
    ].forEach(method => FullpageReact[method] = $.fn.fullpage[method]);

    if (responsiveSlides) {
      [
        'toSections', 'toSlides'
      ].forEach(method => FullpageReact.responsiveSlides[method] = responsiveSlides[method]);
    }
  }

  update(lastEvent, ...args) {
    let state = Object.assign({}, this.state);
    const makeState = newState => Object.assign({}, state, newState);
    const fromArgs = argList => argList.reduce((result, key, i) => {
      result[key] = args[i];
      return result;
    }, {});

    // NOTE: remapping callback args https://github.com/alvarotrigo/fullPage.js#callbacks
    switch (lastEvent) {
      case 'afterLoad':
        state = makeState(fromArgs([
          'anchorLink',
          'index'
        ]));
        break;

      case 'onLeave':
        state = makeState(fromArgs([
          'index',
          'nextIndex',
          'direction'
        ]));
        break;

      case 'isResponsive':
        state = makeState(fromArgs([
          'isResponsive'
        ]));
        break;

      case 'afterSlideLoad':
        state = makeState(fromArgs([
          'anchorLink',
          'index',
          'slideAnchor',
          'slideIndex'
        ]));
        break;

      case 'onSlideLeave':
        state = makeState(fromArgs([
          'anchorLink',
          'index',
          'slideIndex',
          'direction',
          'nextSlideIndex'
        ]));
        break;
    }

    this.setState(state);
  }

  render() {
    return (
      <div id='fullpage-react'>
        {this.props.render(FullpageReact, this.state)}
      </div>
    );
  }
}

export default FullpageReact;
