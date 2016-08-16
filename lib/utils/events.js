var cache = {};

const events = {
  sub: sub,
  pub: pub,
  active: 0
};

function pub(sub, action) {
  console.log('pub', arguments);
  let name = sub.state.name;

  if (!cache[name]) {
    cache[name] = {};
    cache[name].action = action.bind(sub);
  }
}

function sub(sub, arg) {
  console.log('sub', arguments);
  if (events.active == arg) {
    return;
  }

  cache[sub].action(arg);
  events.active = arg;
}

module.exports = events;
