var http = require('http');

var data = {key: 'value', hello: 'world'};

var srv = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'Application/Json'});
    res.end(JSON.stringify(data));
});

srv.listen(8888, function() {
    console.log('listening on localhost:8888');
});