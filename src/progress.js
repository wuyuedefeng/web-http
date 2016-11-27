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