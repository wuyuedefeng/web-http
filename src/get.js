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
    http.get = function (config, successDo, errorDo) {
        var xmlHttp = require('./xmlHttp')();
        xmlHttp.onreadystatechange = require('./stateChange')(xmlHttp, function (tag, code, status) {

        });

        if (config.async !== false) config.async = true;
        xmlHttp.open("GET", config.url, config.async);
        xmlHttp.send(null);
    }
};