import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class HS extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: this.props.activeSlide || 0
        };

        window.__FPR__ = window.__FPR__ || {};
        window.__FPR__[this.props.name] = this;
    }

    render() {
        return this.props.render(this.props, this.state);
    }
}
HS.propTypes = {
    name: PropTypes.string.isRequired,
    activeSlide: PropTypes.number,
    render: PropTypes.func.isRequired
};

export default HS;