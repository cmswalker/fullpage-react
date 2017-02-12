
const objectAssign = require('object-assign');
Object.assign = Object.assign || objectAssign;

function defaultClass() {
  return this.props.className || this.state.defaultClass;
}

function browser() {
	// Return cached result if avalible, else get result then cache it.
	if (browser.prototype._cachedResult) {
    return browser.prototype._cachedResult;
  }

	// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	var isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || !!~navigator.userAgent.indexOf(' OPR/');

	// Firefox 1.0+
	var isFirefox = (typeof InstallTrigger !== 'undefined');

	// At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

	// Chrome 1+
	var isChrome = !!window.chrome && !isOpera;

	// At least IE6
	var isIE = /*@cc_on!@*/false || !!document.documentMode;

	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;

	return (
    isOpera ? 'Opera' :
    isFirefox ? 'Firefox' :
    isSafari ? 'Safari' :
    isChrome ? 'Chrome' :
    isIE ? 'IE' :
    isEdge ? 'Edge' :
    'Other'
  );
}

const ELEMENT_BROWSERS = {
  Firefox: true,
  IE: true,
  Edge: true
};
const KEY_IDX = {
  37: 'left',
  38: -1,
  39: 'right',
  40: 1
};

//for those that use react-universal, we defer all body/document related settings until the browser is hit
var BROWSER = null;
var BODY = null;
var OS = null;
const GET_OS = () => {
  if (!OS) {
    OS = 'OTHER';
    let navigator = window.navigator || {};
    let platform = navigator.platform || '';
    let code = platform.toLowerCase();

    if (code.indexOf('win') >= 0) {
      OS = 'WINDOWS';
    }

    if (code.indexOf('macintel') >= 0) {
      OS = 'OSX';
    }
  }

  return OS;
};

const GET_BROWSER = () => {
  if (!BROWSER) {
    BROWSER = browser();
  }
  return BROWSER;
}

const GET_BODY = () => {
  if (!BODY) {
    BROWSER = browser();
    BODY = ELEMENT_BROWSERS[BROWSER] ? document.documentElement : document.body;
  }

  return BODY;
}

exports.defaultClass = defaultClass;
exports.browser = browser;
exports.ELEMENT_BROWSERS = ELEMENT_BROWSERS;
exports.KEY_IDX = KEY_IDX;
exports.GET_BODY = GET_BODY;
exports.GET_OS = GET_OS;
exports.GET_BROWSER = GET_BROWSER;
