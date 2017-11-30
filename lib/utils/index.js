import * as renderUtils from './renderUtils';
import scrollTo from './scrollTo';
import * as constants from './constants';
import detectOS from './detectOS.js';

function composedPath (el) {
    const paths = [];

    while (el) {
        paths.push(el);

        if (el.tagName === 'HTML') {
            paths.push(document);
            paths.push(window);
            return paths;
       }

       el = el.parentElement;
	}

	return paths;
}

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

function detectBrowser(userAgentString) {
	if (!userAgentString) {
		return null;
	}

	const browsers = [
		['edge', /Edge\/([0-9\._]+)/],
		['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
		['vivaldi', /Vivaldi\/([0-9\.]+)/],
		['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
		['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
		['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
		['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
		['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
		['fxios', /FxiOS\/([0-9\.]+)/],
		['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
		['opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
		['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
		['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
		['ie', /MSIE\s(7\.0)/],
		['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
		['android', /Android\s([0-9\.]+)/],
		['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
		['safari', /Version\/([0-9\._]+).*Safari/]
	];

	return browsers.map(function (rule) {
		if (rule[1].test(userAgentString)) {
			const match = rule[1].exec(userAgentString);
			const version = match && match[1].split(/[._]/).slice(0, 3);

			if (version && version.length < 3) {
				Array.prototype.push.apply(version, (version.length == 1) ? [0, 0] : [0]);
			}

			return {
				name: rule[0],
				version: version.join('.'),
				os: detectOS(userAgentString)
			};
		}
	}).filter(Boolean).shift();
}

export {
	composedPath,
	constants,
	showAll,
	hideAllButActive,
	INTENT_MAP,
	renderUtils,
	scrollTo,
	getNodes,
	detectBrowser
};
