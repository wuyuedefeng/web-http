module.exports = function () {
    var xmlHttp = null;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }else {
        if (!xmlHttp){
            alert('浏览器不支持xmlHttpRequest');
        }
        return null;
    }
    return xmlHttp;
};