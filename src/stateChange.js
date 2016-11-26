var _config = null;
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
        _config.alwaysDo && _config.alwaysDo(false, data);
        _config.successDo && _config.successDo(data);
    } else if (tag == 'error') {
        _config.alwaysDo && _config.alwaysDo(true, data);
        _config.errorDo && _config.errorDo(data);
    }
}

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

