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
        if (readyState == 4) {   // 4 = "loaded"
            if (xhr.status == 200) {
                // 200 = OK
                cb('success', 4, 200)
            }
            else {
                cb('error', 4, xmlHttp.status)
            }
        }
    }
}