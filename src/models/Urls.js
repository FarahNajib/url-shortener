/**
 * Created by samialmouhtaseb on 08/11/17.
 */

let mongoose = require('mongoose'),
  client = require('./../config/redis'),
  utils = require('./../utils/index');

const UrlsSchema = new mongoose.Schema({
  url: { type: String, trim: true },
  seq: { type: Number, unique: true },
  encrypted_seq: { type: String, unique: true, trim: true },
});

const Urls = mongoose.model('Urls', UrlsSchema);

function noop() {
}

Urls.CreateUrls = function (obj, callback) {
  callback = callback || noop;

  const url = new Urls(obj);
  url.save(callback);
};

Urls.GetUrls = function (callback) {
  callback = callback || noop;

  Urls.find({}).lean().exec(callback);
};

Urls.GetUrl = function (encrypted_seq, callback) {
  callback = callback || noop;

  Urls.findOne({ encrypted_seq }).exec(callback);
};


Urls.CreateUrl = function (obj, callback) {
  callback = callback || noop;

  const url = new Urls(obj);
  client.incr(config.encrypted_seq_key, (err, seq) => {
    const encrypted_seq = utils.encode(seq);
    url.seq = seq;
    url.encrypted_seq = encrypted_seq;
    url.save(callback);
  });
};

module.exports = Urls;
