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


