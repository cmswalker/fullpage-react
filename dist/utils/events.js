"use strict";

var cache = {};

var events = {
  sub: sub,
  pub: pub,
  active: 0
};

function sub(sub, action) {
  var name = sub.state.name;

  if (!cache[name]) {
    cache[name] = {};
    cache[name].action = action.bind(sub);
  }
}

function pub(sub, arg) {
  if (events.active == arg) {
    return;
  }

  cache[sub].action(arg);
  events.active = arg;
}

module.exports = events;