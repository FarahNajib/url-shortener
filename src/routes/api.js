/**
 * Created by samialmouhtaseb on 08/11/17.
 */

let utils = require('../utils/index'),
  client = require('../config/redis'),
  Urls = require('../models/Urls');

const urlsApi = {
  getUrl(req, res) {
    if (!req.params.id) {
      res.status(400).json({ response: { success: false, message: 'Url is no valid' } });
      return;
    }

    const url_id = req.params.id;
    const redis_key = `url-${url_id}`;

    client.get(redis_key, (err, url) => {
      if (url) res.redirect(JSON.parse(url).url);
      else {
        Urls.GetUrl(url_id, (err, data) => {
          if (err) res.status(500).json({ response: { success: false, message: 'Something blew up!' } });
          else {
            if (data) {
              client.set(redis_key, JSON.stringify(data), 'EX', config.redis_expiry);
            }
            res.redirect(data.url);
          }
        });
      }
    });
  },
  addUrl(req, res) {
    if (!req.body.url || !utils.checkUrl(req.body.url)) {
      res.status(400).json({ response: { success: false, message: 'Url is no valid' } });
      return;
    }

    const url_url = req.body.url;
    const redis_key = `url-${url_url}`;

    Urls.CreateUrl({ url: url_url }, (err, data) => {
      if (err) res.status(500).json({ response: { success: false, message: 'Something blew up!' } });
      else {
        if (data) {
          client.set(redis_key, JSON.stringify(data), 'EX', config.redis_expiry);
        }
        res.status(200).json({ response: { success: true, message: { url: data } } });
      }
    });
  },
};

const viewsApi = {
  index(req, res) {
    res.redirect('/apps/index.html');
  },
};

const errorApi = {
  error(err, req, res, next) {
    if (err) {
      const error = err.message || err;
      res.status(500).json({ success: false, message: error });
    }
  },
};

module.exports = {
  urls: urlsApi,
  error: errorApi,
  views: viewsApi,
};
