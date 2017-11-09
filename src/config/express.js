/**
 * Created by samialmouhtaseb on 08/11/17.
 */

let fs = require('fs'),
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
  app.use('/apps', serveStatic(path.resolve(`${__dirname}./../../views`)));
  app.use(serveStatic(path.join(__dirname, './../../public')));

  // CookieParser
  app.use(cookieParser());

  // Enable All CORS Requests
  app.use(cors());
};
