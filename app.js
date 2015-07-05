var express = require('express');
var port     = process.env.PORT || 3000;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var exphbs  = require('express-handlebars');
var exphbs = require('hbs');
var mysql = require('mysql');
var moment = require('moment');
var multer = require('multer');
var fs = require('fs');

var app = express();

exphbs.registerHelper('ifCond', function (v1, operator, v2, options) {
            //console.log("in ifCond");
            switch (operator)
            {
                case "==":
                    return (v1==v2)?options.fn(this):options.inverse(this);

                case "!=":
                    return (v1!=v2)?options.fn(this):options.inverse(this);

                case "===":
                    return (v1===v2)?options.fn(this):options.inverse(this);

                case "!==":
                    return (v1!==v2)?options.fn(this):options.inverse(this);

                case "&&":
                    return (v1&&v2)?options.fn(this):options.inverse(this);

                case "||":
                    return (v1||v2)?options.fn(this):options.inverse(this);

                case "<":
                    return (v1<v2)?options.fn(this):options.inverse(this);

                case "<=":
                    return (v1<=v2)?options.fn(this):options.inverse(this);

                case ">":
                    return (v1>v2)?options.fn(this):options.inverse(this);

                case ">=":
                 return (v1>=v2)?options.fn(this):options.inverse(this);

                default:
                    return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
            }
        }
);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '#havoc4110'
});

connection.query('USE havoc');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.engine('handlebars', exphbs({defaultLayout: 'index'}));
//app.engine('handlebars', hbs.engine);
app.set('view engine', 'hbs');
exphbs.registerPartials(__dirname + '/views/partials');
//app.set('view engine', 'handlebars');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

var done = false;
app.use(multer({ dest: './public/img/uploads/',
  rename: function (fieldname, filename) {
    return filename+Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    done=true;
    //routes.upload_game(file);
  }
}));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.connection = connection;
    next();
});

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);

//require('./routes/index.js')(app, passport);

//var request = require('request');

//var getCodeURL = "https://auth.teamsnap.com/oauth/authorize?client_id=fefdcb5c06ae473c1f2ff0cb891ccab1c3afa1938fdbff634d0d2c95244461bb&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code"

//var getTokenURL = "https://auth.teamsnap.com/oauth/token?client_id=fefdcb5c06ae473c1f2ff0cb891ccab1c3afa1938fdbff634d0d2c95244461bb&client_secret=2b481cb1be0400e889bacce690aa95fa5fadf942d58b23d65dece4853522873d&redirect_uri=urn:ietf:wg:oauth:2.0:oob&code=235ab5ec9b20a3f65e942297cb0d733894a13dd76c21cf592907e99b8f966174&grant_type=authorization_code";

//request.get('https://api.teamsnap.com/v3/events/search?team_id=373975', {
//  'auth': {
//    'bearer': '6d6ea9ccade7f37b621d647f80f860961adadb45d433c0ba5fca6e91563bd072'
//  }}, function  (error, response, body) {
//      var finalData = response.body.replace(/\\/g, "");
//      console.log("response: " + finalData);
//  }
//);

//request.post(getTokenURL, function (error, response, body) {
//  console.log("response: " + JSON.stringify(response));
//  if (!error && response.statusCode == 200) {
//    console.log(body) // Show the HTML for the Google homepage.
//  }
//});

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
    message: err.message,
    error: {}
  });
});

module.exports = app;
