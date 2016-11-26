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
    http.download = function (config, successDo, errorDo) {
        var xhr = require('./xhr')();
        config = config || {};
        config.successDo = config.successDo || successDo;
        config.errorDo = config.errorDo || errorDo;
        config.xhr = xhr;

        xhr.onreadystatechange = require('./stateChange')(config);

    }
};