/**
 * Created by samialmouhtaseb on 08/11/17.
 */

const mongoose = require('mongoose');

const UrlsSchema = new mongoose.Schema({
  url: { type: String, default: '', trim: true },
  encrypted_url: { type: String, default: '', trim: true },
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

Urls.GetUrl = function (url_id, callback) {
  callback = callback || noop;

  Urls.findOne({ _id: url_id }).exec(callback);
};


Urls.CreateUrl = function (obj, callback) {
  callback = callback || noop;

  const url = new Urls(obj);
  url.save(callback);
};

module.exports = Urls;
