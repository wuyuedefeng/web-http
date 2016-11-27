(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    var http = {};
    require('./get')(http);
    require('./post')(http);
    require('./download')(http);
    window.xhttp = http;
})();




},{"./download":2,"./get":3,"./post":4}],2:[function(require,module,exports){
var tool = require('./tool');
/**
 * @param config {}
 * url ""
 * async: bool, default: true
 * onProgress function
 * timeout integer ms
 * onTimeout function
 * params: {}
 * headers: {}
 * alwaysDo (isErr, data)
 * @param successDo
 * @param errorDo
 */
module.exports = function (http) {
    http.download = function (config, onSuccess, onError) {
        tool.handleConfig(config, onSuccess, onError);
        var xhr = require('./xhr')();
        config.xhr = xhr;
        xhr.onprogress = require('./progress')(config);

        xhr.onreadystatechange = require('./stateChange')(config);

        if (config.async){
            xhr.timeout = config.timeout || 999999999;
            xhr.ontimeout = config.onTimeout || function(event){
                    console.error(`${config.url} request timeout ${config.timeout}ms`);
                };
        }

        var urlParams = tool.objToParams(config.params);
        xhr.open("GET", `${config.url}?${urlParams}`, config.async);

        config.headers = config.headers || {};
        for (var key in config.headers) {
            xhr.setRequestHeader(key, config.headers[key])
        }

        xhr.send(null);
    }
};
},{"./progress":5,"./stateChange":6,"./tool":7,"./xhr":8}],3:[function(require,module,exports){
var tool = require('./tool');
module.exports = function (http) {
    /**
     * @param config {}
     * url ""
     * async: bool, default: true
     * params: {}
     * headers: {}
     * onEnd (isErr, data)
     * @param onSuccess
     * @param onError
     */
    http.get = function (config, onSuccess, onError) {
        tool.handleConfig(config, onSuccess, onError);
        var xhr = require('./xhr')();
        config.xhr = xhr;


        xhr.onreadystatechange = require('./stateChange')(config);

        if (config.async !== false) config.async = true;
        /* .open("method","url",boolean):
         参数：method为请求的类型（get，post等），
         url为路径，
         boolean为是否异步发送请求。
         调用该方法并不会真正发送请求，而只是启动一个请求以备发送。
         */

        var urlParams = tool.objToParams(config.params);
        xhr.open("GET", `${config.url}?${urlParams}`, config.async);

        /* .setRequestHeader("name","value"):设置自定义的请求头部信息。
         参数:name为自定义的头部字段的名称
         （不要使用浏览器正常发送的字段名称，并不是所有的浏览器都允许重写默认的头部信息），
         value为自定义的头部字段的值。
         该方法的调用必须在调用open()方法之后且在调用send()方法之前。
         */
        config.headers = config.headers || {};
        for (var key in config.headers) {
            xhr.setRequestHeader(key, config.headers[key])
        }

        // .send(data):将请求发送到服务器。参数data是作为请求主体发送的数据，若不需要传数据，即data为null。服务器在收到响应后，响应的数据会自动填充XHR对象的属性。相关属性有responseText、responseXML、status、statusText、readyStatus
        xhr.send(null);

        //.abort():在接收到响应之前取消异步请求。
        // xhr.abort()
        return xhr;
    }
};
},{"./stateChange":6,"./tool":7,"./xhr":8}],4:[function(require,module,exports){
var tool = require('./tool');
module.exports = function (http) {
    /**
     * @param config {}
     * url ""
     * async: bool, default: true
     * params: {}
     * headers: {}
     * onEnd (isErr, data)
     * @param onSuccess
     * @param onError
     */
    http.post = function (config, onSuccess, onError) {
        tool.handleConfig(config, onSuccess, onError);
        var xhr = require('./xhr')();
        config.xhr = xhr;

        xhr.onreadystatechange = require('./stateChange')(config);

        if (config.async !== false) config.async = true;
        /* .open("method","url",boolean):
         参数：method为请求的类型（get，post等），
         url为路径，
         boolean为是否异步发送请求。
         调用该方法并不会真正发送请求，而只是启动一个请求以备发送。
         */

        var urlParams = tool.objToParams(config.params);
        xhr.open("POST", `${config.url}?${urlParams}`, config.async);

        /* .setRequestHeader("name","value"):设置自定义的请求头部信息。
         参数:name为自定义的头部字段的名称
         （不要使用浏览器正常发送的字段名称，并不是所有的浏览器都允许重写默认的头部信息），
         value为自定义的头部字段的值。
         该方法的调用必须在调用open()方法之后且在调用send()方法之前。
         */
        config.headers = config.headers || {};
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        for (var key in config.headers) {
            xhr.setRequestHeader(key, config.headers[key])
        }

        // .send(data):将请求发送到服务器。参数data是作为请求主体发送的数据，若不需要传数据，即data为null。服务器在收到响应后，响应的数据会自动填充XHR对象的属性。相关属性有responseText、responseXML、status、statusText、readyStatus
        console.log(11, config.data, tool.objToParams(config.data));
        xhr.send(tool.objToParams(config.data) || null);

        //.abort():在接收到响应之前取消异步请求。
        // xhr.abort()
        return xhr;
    }
};



},{"./stateChange":6,"./tool":7,"./xhr":8}],5:[function(require,module,exports){
module.exports = function (config) {
    return function progress(event) {
        if (event["lengthComputable"]) {
            //evt.loaded the bytes browser receive
            //evt.total the total bytes seted by the header
            var percentComplete = (event["loaded"] / event["total"]) * 100;
            console.log(percentComplete);
            config["onProgress"] && config["onProgress"](event, percentComplete);
        }
    }
};
},{}],6:[function(require,module,exports){
var _config = null;

/**
 * @param xmlHttp
 * @param cb
 * tag
 * code
 * status
 */
module.exports = function stateChange(config) {
    _config = config;
    var xhr = config.xhr;
    return function () {
        var readyState = xhr.readyState;
        // readyState: 该属性表示请求/响应过程的当前活动阶段
        // 0:未初始化。尚未调用open()方法。
        // 1:启动。已经调用open()方法，但尚未调用send()方法。
        // 2:发送。已经调用send()方法，但尚未接受到响应。
        // 3:接收。已经接受到部分响应数据。
        // 4:完成。已经接收到全部的响应数据。
        // console.log(readyState, xhr.status, xhr.response.length, xhr);
        if (readyState == 4) {   // 4 = "loaded"
            if (xhr.status == 200) {
                // 200 = OK
                changeStateHandle('success', 4, 200)
            }
            else {
                changeStateHandle('error', 4, xhr.status, xhr.statusText)
            }
        }
    }
};

/**
 * 网络请求状态监测
 * @param tag string
 * 'success' 表示请求成功
 * 'error' 表示请求失败
 * @param readyState integer
 * 0:未初始化。尚未调用open()方法。
 * 1:启动。已经调用open()方法，但尚未调用send()方法。
 * 2:发送。已经调用send()方法，但尚未接受到响应。
 * 3:接收。已经接受到部分响应数据。
 * 4:完成。已经接收到全部的响应数据。
 * @param status
 * @param statusText
 */
function changeStateHandle(tag, readyState, status, statusText) {
    var xhr = _config.xhr;

    // .getResponseHeader('name'): 获取相应的响应头部信息。
    // 参数：name为头部字段名称。返回一个对应的值的字符串。
    // .getAllResponseHeaders():返回一个包含所有头部信息（key-value）的长字符串。
    // xhr.getAllResponseHeaders();    //'Content-Type: text/html'
    var contentType = xhr.getResponseHeader('Content-Type');

    // xhr.response为从服务器获取下来的数据。
    var data = xhr.response;

    if (tag == 'success') {
        if (/json/i.test(contentType)) {
            data = JSON.parse(data);
        }
        _config["onEnd"] && _config["onEnd"](false, data);
        _config.onSuccess && _config.onSuccess(data);
    } else if (tag == 'error') {
        _config["onEnd"] && _config["onEnd"](true, data);
        _config.onError && _config.onError(data);
    }
}




},{}],7:[function(require,module,exports){
function objToParams(obj) {
    return Object.keys(obj).map(function(key) {
        return key + '=' + obj[key];
    }).join('&');
}
exports.objToParams = objToParams;

exports.objToData = function (obj) {

    if ('FormData' in window) {
        var data = new FormData();
        for (key in obj){
            console.log(key);
            data.append(key, obj["key"]);
        }
    }else {
        data = objToParams(obj);
    }
    return data;
};

exports.handleConfig = function (config, onSuccess, onError) {
    config = config || {};
    config.params = config.params || {};
    config.data = config.data || {};
    config.onSuccess = config.onSuccess || onSuccess;
    config.onError = config.onError || onError;
    if (config.async !== false) config.async = true;
};
},{}],8:[function(require,module,exports){
module.exports = function () {
    var xmlHttp = null;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }else {
        if (!xmlHttp){
            alert('浏览器不支持xmlHttpRequest');
        }
        return null;
    }
    return xmlHttp;
};
},{}]},{},[1]);
