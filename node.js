var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    console.log(req.params, req.query);
    res.send('hello world');
});


app.post('/', function(req, res) {
    console.log(req.body, req.query);
    res.send({
        a: 1,
        b: 2
    });
});

app.listen('8888');