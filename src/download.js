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