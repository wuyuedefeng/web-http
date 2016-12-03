// event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0。
// 与progress事件相关的，还有其他五个事件，可以分别指定回调函数：
// * load事件：传输成功完成。
//
// * abort事件：传输被用户取消。
//
// * error事件：传输中出现错误。
//
// * loadstart事件：传输开始。
//
// * loadEnd事件：传输结束，但是不知道成功还是失败。

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