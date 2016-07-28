var cache = {};

const events = {
  sub: sub,
  pub: pub,
  active: 0
};

function sub(sub, action) {
  let name = sub.state.name;

  if (!cache[name]) {
    cache[name] = {};
    cache[name].action = action.bind(sub);
  }
}

function pub(sub, arg) {
  if (events.active == arg) {
    return;
  }

  return cache[sub].action(arg);
}

module.exports = events;
