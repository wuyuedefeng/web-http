var tool = require('./tool');
module.exports = function (config, onSuccess, onError) {

    var ot;//上传开始时间
    var oloaded;//已经上传的文件大小，默认0
    // 统一初始化config参数
    tool.handleConfig(config, onSuccess, onError);

    var xhr = require('./xhr')();
    config.xhr = xhr;

    // 开始上传文件
    xhr.upload.onloadstart = function(){//上传开始执行方法
        ot = new Date().getTime();   //设置上传开始时间
        oloaded = 0;//设置上传开始时，以上传的文件大小为0
    };
    //【上传进度调用方法实现】
    xhr.upload.onprogress = function (evt) {
        if (evt["lengthComputable"]) {
            var percentComplete = (event["loaded"] / event["total"]) * 100;
            console.log('upload:', percentComplete);
            config["onProgress"] && config["onProgress"](event, percentComplete);
        }
    };
    //请求完成
    xhr.onload = function (evt) {
        //服务接收完文件返回的结果 evt.target.responseText
        console.log("上传成功！");
    };
    //请求失败
    xhr.onerror =  function (evt) {
        console.log("上传失败！");
    };
    //取消上传
    // xhr.abort();
    xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
    var urlParams = tool.objToParams(config.params);
    //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
    xhr.open("post", `${config.url}?${urlParams}`, config.async);

    // var form = new FormData(); // FormData 对象
    // form.append("mf", fileObj); // 文件对象

    xhr.send(config.data); //开始上传，发送form数据
};