'use strict';

var objectAssign = require('object-assign');
Object.assign = Object.assign || objectAssign;

function defaultClass() {
	return this.props.className || this.state.defaultClass;
}

function browser() {
	// Return cached result if avalible, else get result then cache it.
	if (browser.prototype._cachedResult) return browser.prototype._cachedResult;

	// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	var isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';

	// At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

	// Chrome 1+
	var isChrome = !!window.chrome && !isOpera;

	// At least IE6
	var isIE = /*@cc_on!@*/false || !!document.documentMode;

	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;

	return browser.prototype._cachedResult = isOpera ? 'Opera' : isFirefox ? 'Firefox' : isSafari ? 'Safari' : isChrome ? 'Chrome' : isIE ? 'IE' : isEdge ? 'Edge' : "Other";
};

exports.defaultClass = defaultClass;
exports.browser = browser;
exports.elementBrowsers = ['Firefox', 'IE', 'Edge'];