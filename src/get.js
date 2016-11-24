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
        var xhr = require('./xmlHttp')();
        xhr.onreadystatechange = require('./stateChange')(xhr, function (tag, code, status) {
            var contentType = xhr.getResponseHeader('Content-Type');
            var data = xhr.response;
            if (/json/i.test(contentType)){
                data = JSON.parse(data);
            }

            if (tag == 'success'){
                if (config.alwaysDo){
                    config.alwaysDo(false, data);
                }
                successDo(data);
            }else if (tag == 'error'){
                if (config.alwaysDo){
                    config.alwaysDo(true, data);
                }
                errorDo(data);
            }
        });

        if (config.async !== false) config.async = true;
        xhr.open("GET", config.url, config.async);
        xhr.send(null);
    }
};