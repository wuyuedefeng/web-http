var _postConfig = null;

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
    var xhr = _postConfig.xhr;

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
        _postConfig.alwaysDo && _postConfig.alwaysDo(false, data);
        _postConfig.successDo && _postConfig.successDo(data);
    } else if (tag == 'error') {
        _postConfig.alwaysDo && _postConfig.alwaysDo(true, data);
        _postConfig.errorDo && _postConfig.errorDo(data);
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
    http.post = function (config, successDo, errorDo) {
        var xhr = require('./xhr')();
        _postConfig = config;
        _postConfig.successDo = _postConfig.successDo || successDo;
        _postConfig.errorDo = _postConfig.errorDo || errorDo;
        _postConfig.xhr = xhr;


        xhr.onreadystatechange = require('./stateChange')(config);

        if (config.async !== false) config.async = true;
        /* .open("method","url",boolean):
         参数：method为请求的类型（get，post等），
         url为路径，
         boolean为是否异步发送请求。
         调用该方法并不会真正发送请求，而只是启动一个请求以备发送。
         */
        xhr.open("POST", config.url, config.async);

        /* .setRequestHeader("name","value"):设置自定义的请求头部信息。
         参数:name为自定义的头部字段的名称
         （不要使用浏览器正常发送的字段名称，并不是所有的浏览器都允许重写默认的头部信息），
         value为自定义的头部字段的值。
         该方法的调用必须在调用open()方法之后且在调用send()方法之前。
         */
        config.headers = config.headers || {};
        for (var key in config.headers) {
            console.log(key);
            xhr.setRequestHeader(key, config.headers[key])
        }

        // .send(data):将请求发送到服务器。参数data是作为请求主体发送的数据，若不需要传数据，即data为null。服务器在收到响应后，响应的数据会自动填充XHR对象的属性。相关属性有responseText、responseXML、status、statusText、readyStatus
        xhr.send(config.params || null);

        //.abort():在接收到响应之前取消异步请求。
        // xhr.abort()
        return xhr;
    }
};