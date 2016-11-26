(function () {
    var http = {};
    require('./get')(http);
    require('./post')(http);
    window.xhttp = http;
})();



