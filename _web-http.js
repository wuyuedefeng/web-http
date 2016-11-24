(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var http = {};

require('./get')(http);
require('./post')(http);

window.http = http;

},{"./get":2,"./post":3}],2:[function(require,module,exports){
var _getConfig = null;
function changeStateHandle(tag, code, status) {
    var xhr = _getConfig.xhr;

    var contentType = xhr.getResponseHeader('Content-Type');
    var data = xhr.response;
    if (/json/i.test(contentType)) {
        data = JSON.parse(data);
    }

    if (tag == 'success') {
        _getConfig.alwaysDo && _getConfig.alwaysDo(false, data);
        _getConfig.successDo && _getConfig.successDo(data);
    } else if (tag == 'error') {
        _getConfig.alwaysDo && _getConfig.alwaysDo(true, data);
        _getConfig.errorDo && _getConfig.errorDo(data);
    }
}

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
        var xhr = require('./xmlHttp')();
        _getConfig = config;
        _getConfig.successDo = _getConfig.successDo || successDo;
        _getConfig.errorDo = _getConfig.errorDo || errorDo;
        _getConfig.xhr = xhr;

        xhr.onreadystatechange = require('./stateChange')(xhr, changeStateHandle);

        if (config.async !== false) config.async = true;
        /* .open("method","url",boolean):
         参数：method为请求的类型（get，post等），
         url为路径，
         boolean为是否异步发送请求。
         调用该方法并不会真正发送请求，而只是启动一个请求以备发送。
         */
        xhr.open("GET", config.url, config.async);

        /* .setRequestHeader("name","value"):设置自定义的请求头部信息。
         参数:name为自定义的头部字段的名称
         （不要使用浏览器正常发送的字段名称，并不是所有的浏览器都允许重写默认的头部信息），
         value为自定义的头部字段的值。
         该方法的调用必须在调用open()方法之后且在调用send()方法之前。
         */
        config.headers = config.headers || {};
        for (var key in config.headers) {
            console.log(key);
            xhr.setRequestHeader(key, config.headers[key]);
        }

        // .send(data):将请求发送到服务器。参数data是作为请求主体发送的数据，若不需要传数据，即data为null。服务器在收到响应后，响应的数据会自动填充XHR对象的属性。相关属性有responseText、responseXML、status、statusText、readyStatus
        xhr.send(config.params || null);

        //.abort():在接收到响应之前取消异步请求。
        // xhr.abort()
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
module.exports = function stateChange(xhr, cb) {
    return function () {
        var readyState = xhr.readyState;
        // readyState: 该属性表示请求/响应过程的当前活动阶段
        // 0:未初始化。尚未调用open()方法。
        // 1:启动。已经调用open()方法，但尚未调用send()方法。
        // 2:发送。已经调用send()方法，但尚未接受到响应。
        // 3:接收。已经接受到部分响应数据。
        // 4:完成。已经接收到全部的响应数据。
        if (readyState == 4) {
            // 4 = "loaded"
            if (xhr.status == 200) {
                // 200 = OK
                cb('success', 4, 200);
            } else {
                cb('error', 4, xmlHttp.status);
            }
        }
    };
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