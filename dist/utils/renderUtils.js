"use strict";

function defaultClass() {
  return this.props.className || this.state.defaultClass;
}

exports.defaultClass = defaultClass;