var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var speech = require('./routes/speech');
var speechClass = require('./routes/speech_class');
var speechMember = require('./routes/speech_member');
var users = require('./routes/users');

const config = require('./config/config');

var app = express();

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin',  req.headers.origin = req.headers.origin || req.headers.host);
  // res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, x-access-token')
  
  res.header('Access-Control-Expose-Headers', 'x-access-token')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.header('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//facebook-passport
app.use(require('express-session')({ secret: config.development.secret_key, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/speech', speech);
app.use('/api/speechclass', speechClass);
app.use('/api/speechmember', speechMember);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;