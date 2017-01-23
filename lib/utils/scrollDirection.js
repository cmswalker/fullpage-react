const VERTICAL = 'VERTICAL';
const HORIZONTAL = 'HORIZONTAL';

module.exports = scrollDirection;
function scrollDirection(scrollIncrement = 2, touchIncrement = 10) {
  this.scrollIncrement = scrollIncrement;
  this.touchIncrement = touchIncrement;
  this.touchArr = [];
  this.latestTouch = null;
  this.latestDirection = VERTICAL;
  this.xArr = [];
  this.yArr = [];
}

scrollDirection.prototype.touchFulfilled = function touchFulfilled() {
  return (this.touchArr.length > this.touchIncrement);
}
scrollDirection.prototype.getTouch = function getTouch(idx) {
  return this.touchArr[idx];
}
scrollDirection.prototype.addTouch = function addTouch(touch) {
  this.latestTouch = touch;
  this.touchArr.push(touch);
}
scrollDirection.prototype.resetTouches = function resetTouches() {
  this.touchArr = [];
}

scrollDirection.prototype.addXScroll = function addXScroll(s) {
  this.xArr.push(s);
}
scrollDirection.prototype.addYScroll = function addYScroll(s) {
  this.yArr.push(s);
}
scrollDirection.prototype.getDirection = function getDirection() {
  return this.latestDirection;
}
scrollDirection.prototype.scrollFulfilled = function scrollFulfilled(cb) {
  var bool = (this.xArr.length > this.scrollIncrement && this.yArr.length > this.scrollIncrement);
  this.evalScrollDirection();
  if (bool) {
    this.xArr = [];
    this.yArr = [];
  }

  cb(bool, this.latestDirection);
}
scrollDirection.prototype.evalScrollDirection = function evalScrollDirection() {
  var unique = this.getUniqueScrolls();
  var xSize = unique.x.size;
  var ySize = unique.y.size;
  this.latestDirection = xSize > ySize ? HORIZONTAL : VERTICAL;
}
scrollDirection.prototype.getUniqueScrolls = function getUniqueScrolls() {
  return {
    x: new Set(this.xArr),
    y: new Set(this.yArr)
  }
}
scrollDirection.prototype.getScrollDirection = function getScrollDirection() {
  return this.latestDirection;
}
