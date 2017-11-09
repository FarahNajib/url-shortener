/**
 * Created by samialmouhtaseb on 08/11/17.
 */

let fs = require('fs'),
  express = require('express'),
  favicon = require('serve-favicon'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  compression = require('compression'),
  serveStatic = require('serve-static'),
  methodOverride = require('method-override'),
  path = require('path'),
  cors = require('cors'),
  swig = require('swig'),
  morgan = require('morgan');

module.exports = function (app) {
  // Compress all requests
  app.use(compression());

  // Logging middleware
  // var logPath = path.resolve(__dirname + './../../log');
  // var accessLogStream = fs.createWriteStream(logPath + '/access.log', {flags: 'a'});
  // var logger = morgan("combined", {stream: accessLogStream});
  // app.use(logger);

  // BodyParser should be above MethodOverride
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use((req, res, next) => {
    res.set('X-Powered-By', 'Url Shortener');
    next();
  });

  // Set views path, Template engine and Default layout
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.use(express.static(path.join(__dirname, './../../views')));
  app.use('/public', express.static(path.join(__dirname, './../../public')));
  app.use(favicon(path.join(__dirname, './../../public', 'favicon.ico')))

  // CookieParser
  app.use(cookieParser());

  // Enable All CORS Requests
  app.use(cors());
};
