var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");



var indexRouter = require('./routes/index');
var decksRouter = require('./routes/cards');

var app = express();

// MODELS
fs.readdirSync(__dirname + '/models').forEach(function (filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});

// Connect to the db
if ('development' == app.get('env')) {
  console.log('you are running in dev mode');
  mongoose.connect('mongodb://localhost:27017/flashcardsy?socketTimeoutMS=100000');
  app.locals.pretty = true;
} else if ('production') {
  console.log("you are running in production");
  mongoose.connect('mongodb://flashcards:companies1234EBS@localhost:27017/flash?authSource=admin')
};

mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
// app.engine('ejs', require('ejs').renderFile);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/decks', decksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
