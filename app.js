var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash')

var routes = require('./routes/index');
var users = require('./routes/users');

global.dbHandel = require('./mongoose/dbHandel');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    },
    name: 'name',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = "";
    if (err) {
        res.locals.message = '<blockquote class="layui-login-alert"> ' +  err + '</blockquote>';
    }
    next();
});

app.use('/', routes);
app.use('/login', routes);
app.use('/register', routes); 
app.use('/monitor', routes);
app.use('/index', routes);
// app.use(function(req, res){
//     if(req.url!=="/favicon.ico") {
//          console.log(req.url);
//          res.end();
//     }
// })


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title: "error",
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: "error",
    message: err.message,
    error: {}
  });
});


module.exports = app;
