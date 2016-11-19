var cache = {};

function pub(sub, action) {
  let name = sub.state.name;

  if (!cache[name]) {
    cache[name] = {};
    cache[name].action = action.bind(sub);
  }
}

function sub(sub, arg) {
  if (events.active == arg) {
    return;
  }

  cache[sub].action(arg);
  events.active = arg;
}

function clearCache() {
  cache = {};
}

const events = {
  sub: sub,
  pub: pub,
  active: 0,
  clearCache
};

module.exports = events;
