var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var _ = require("lodash");

var config = require('./config');
var path = require('path');


var app = express(); // define our app using express
// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// configure our app to handle CORS requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,content-type, Authorization');
    next();
});

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var apiRoutes = require('./app/routes/imageapi')(app, express);
app.use('/api/image', apiRoutes);

var apiRoutes = require('./app/routes/userapi')(app, express);
app.use('/api', apiRoutes);


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

app.listen(config.port);
console.log('Magic happens on port ' + config.port);