import * as renderUtils from './renderUtils';
import scrollTo from './scrollTo';
import * as constants from './constants';

function getNodes(document, sel) {
	return document.querySelectorAll(`[${sel}]`);
}

function hideAllButActive(activeSlide, nodes) {
	Array.prototype.forEach.call(nodes, (n, i) => {
		if (i === activeSlide) {
			n.style.display = 'inline-block';
		} else {
			n.style.display = 'none';
		}
	});
}

function showAll(nodes) {
	Array.prototype.forEach.call(nodes, (n) => {
		n.style.display = 'inline-block';
	});
}

const INTENT_MAP = {
	'VERTICAL': {
		0: 'UP',
		1: 'DOWN'
	},
	'HORIZONTAL': {
		0: 'LEFT',
		1: 'RIGHT'
	}
};

export {
	constants,
	showAll,
  hideAllButActive,
  INTENT_MAP,
  renderUtils,
  scrollTo,
	getNodes
};
