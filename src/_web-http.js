(function () {
    var http = {};
    require('./get')(http);
    require('./post')(http);
    require('./download')(http);
    window.xhttp = http;
})();



