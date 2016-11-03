const SCROLL_DIRECTIONS = {
	Y: 'VERTICAL',
	VERTICAL: 'Y',
	X: 'HORIZONTAL',
	HORIZONTAL: 'X'
};

const ELEMENT_AXIS = {
	VERTICAL: 'scrollTop',
	HORIZONTAL: 'scrollLeft'
};

const KEY_IDX = {
  37: 'left',
  38: -1,
  39: 'right',
  40: 1
};

exports.SCROLL_DIRECTIONS = SCROLL_DIRECTIONS;
exports.KEY_IDX = KEY_IDX;
exports.ELEMENT_AXIS = ELEMENT_AXIS;
