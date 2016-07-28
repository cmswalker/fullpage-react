var cache = {};

const events = {
  sub: sub,
  pub: pub
};

function sub(sub, action) {
  let name = sub.state.name;

  if (!cache[name]) {
    cache[name] = {};
    cache[name].action = action.bind(sub);
  }
}

function pub(sub, arg) {
  return cache[sub].action(arg);
}

module.exports = events;
