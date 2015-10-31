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


app.models=require('./app/models/index');

var routes=require('./app/routes');

_.each(routes,function(controller,route){
	console.log('routes'+route);
	app.use(route,controller(app,route));
});
console.log('routes'+routes);
//var apiRoutes = require('./app/routes/imageapi')(app, express);
//app.use('/api/image', apiRoutes);

//var apiRoutes = require('./app/routes/userapi')(app, express);
//app.use('/api', apiRoutes);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});
mongoose.connect('mongodb://blissarts:kuchbhi77@ds035663.mongolab.com:35663/blissarts');

mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");

});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
  });
app.listen(config.port);
console.log('Magic happens on port ' + config.port);