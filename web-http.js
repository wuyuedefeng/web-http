(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var http = {};

require('./get')(http);
require('./post')(http);

},{"./get":2,"./post":3}],2:[function(require,module,exports){
module.exports = function (http) {
    /**
     * @param config {}
     * url ""
     * async: bool
     * params: {}
     * headers: {}
     * alwaysDo (isErr, data)
     * @param successDo
     * @param errorDo
     */
    http.get = function (config, successDo, errorDo) {
        var xmlHttp = require('./xmlHttp')();
        xmlHttp.onreadystatechange = require('./stateChange')(xmlHttp, function (tag, code, status) {});

        if (config.async !== false) config.async = true;
        xmlHttp.open("GET", config.url, config.async);
        xmlHttp.send(null);
    };
};

},{"./stateChange":4,"./xmlHttp":5}],3:[function(require,module,exports){
module.exports = function (xmlHttp) {};

},{}],4:[function(require,module,exports){
/**
 * @param xmlHttp
 * @param cb
 * tag
 * code
 * status
 */
module.exports = function stateChange(xmlHttp, cb) {
    if (xmlHttp.readyState == 4) {
        // 4 = "loaded"
        if (xmlHttp.status == 200) {
            // 200 = OK
            // ...our code here...
            cb('success', 4, 200);
        } else {
            cb('error', 4, xmlHttp.status);
        }
    }
};

},{}],5:[function(require,module,exports){
module.exports = function () {
    var xmlHttp = null;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        if (!xmlHttp) {
            alert('浏览器不支持xmlHttpRequest');
        }
        return null;
    }
    return xmlHttp;
};

},{}]},{},[1])