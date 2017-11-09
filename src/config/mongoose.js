/**
 * Created by samialmouhtaseb on 09/11/17.
 */

let mongoose = require('mongoose'),
  config = require('./index');

// Connect to mongodb
const connect = function () {
  const options = { useMongoClient: true };
  mongoose.connect(config.mongodb_uri, options);
  mongoose.Promise = global.Promise;
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
