var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world');
});


app.post('/', function(req, res) {
    res.send({
        a: 1,
        b: 2
    });
});

app.listen('8888');