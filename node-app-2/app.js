var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var pool = mysql.createPool({
    host: process.env.M_HOST ? process.env.M_HOST : 'localhost',
    user: process.env.M_USER ? process.env.M_USER : 'root',
    password: process.env.M_PASS ? process.env.M_PASS : 'test',
    port: 3306,
    database : 'test'
});

setInterval(function() {
    pool.query('SELECT round(rand()*10 + rand()*10) AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log(`${new Date()} | The solution is: ${results[0].solution}`)
    });
}, 10000);

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
