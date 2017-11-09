/**
 * Created by samialmouhtaseb on 08/11/17.
 */

let newrelic = require('newrelic'),
  express = require('express');

const app = express();

app.locals.newrelic = newrelic;

require('./src/config/mongoose');
require('./src/config/redis');
require('./src/config/express')(app);

exports = module.exports = app;
