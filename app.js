var express = require('express');
var app = express();
var d3 = require('d3');

var handleError = require('./middlewares/handleError');
var pageNotFound = require('./middlewares/pageNotFound');
var playerRouter = require('./routes/player');
var teamRouter = require('./routes/team');

// Serve static pages
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Baseball Dashboard with MongoDB, Mongoose, ExpressJS, EJS, NodeJS, and D3'
  });
});

app.use('/player', playerRouter);
app.use('/team', teamRouter);

// Mount error-handling middleware.
app.use(handleError);
app.use(pageNotFound);

module.exports = app;
