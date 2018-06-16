var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sessions = require('client-sessions');
const fs = require('fs');
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const flash = require('connect-flash');
const pug = require('pug');
var bodyParser = require('body-parser');


var app = express();



// configure the app to use bodyParser()
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//===SETTING UP COOKIE & SESSION VARIABLES===//
const User = require("./models/user");

app.use(sessions({
  cookieName: 'session',
  secret: 'petsRfleeFree123',
  duration: 30 * 60 * 10000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

app.use((req, res, next) => {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function (err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; //delete the hash pass from the session
        req.session.user = user;
        res.locals.user = user;
      }
      next();
    });
  } else {
    next();
  }
});
//================//
//====FLASH======//
app.use(flash());
//===============//

var indexRouter = require('./routes/index');
var decksRouter = require('./routes/cards');


// MODELS
fs.readdirSync(__dirname + '/models').forEach(function (filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});


app.use(function varsForPug(req, res, next) {
  // res.locals.moment = require('moment');
  // String(moment().format('YYYY/MM/DD hh:mm'))
  res.locals._flashMessage = req.flash('message');
  res.locals._flashError = req.flash('error');
  next();
})

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
app.set('view engine', 'pug');
app.engine('pug', require('pug').renderFile);
// app.engine('pug', require('pug').renderFile);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/flashcards/', express.static(path.join(__dirname, 'public')));

app.use('/flashcards/index', indexRouter);
app.use('/flashcards', decksRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)
  // render the error page
  req.flash('error', err.message || "something went wrong, please try again");
  res.redirect('back');
});
app.use(express.static("."));

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
