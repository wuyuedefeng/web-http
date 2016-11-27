/**
 * @param config {}
 * url ""
 * async: bool, default: true
 * onProgress
 * params: {}
 * headers: {}
 * alwaysDo (isErr, data)
 * @param successDo
 * @param errorDo
 */
module.exports = function (http) {
    http.download = function (config, onSuccess, onError) {
        var xhr = require('./xhr')();
        config = config || {};
        config.onSuccess = config.onSuccess || onSuccess;
        config.onError = config.onError || onError;
        config.xhr = xhr;

        xhr.onprogress = require('./progress')(config);

        xhr.onreadystatechange = require('./stateChange')(config);
        xhr.open('GET', config.url, true);
        xhr.send(null);
    }
};