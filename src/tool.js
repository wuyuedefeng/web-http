function objToParams(obj) {
    return Object.keys(obj).map(function(key) {
        return key + '=' + obj[key];
    }).join('&');
}
exports.objToParams = objToParams;

exports.objToData = function (obj) {

    if ('FormData' in window) {
        var data = new FormData();
        for (key in obj){
            console.log(key);
            data.append(key, obj["key"]);
        }
    }else {
        data = objToParams(obj);
    }
    return data;
};