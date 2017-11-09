/**
 * Created by samialmouhtaseb on 08/11/17.
 */

let utils = require('../utils/index'),
  client = require('../config/redis'),
  Urls = require('../models/Urls');

const urlsApi = {
  redirectUrl(req, res) {
    if (!req.params.id) {
      res.status(200).json({ response: { success: false, message: 'Url is no valid' } });
      return;
    }

    const encrypted_seq = req.params.id;
    const redis_key = `url-${encrypted_seq}`;

    client.get(redis_key, (err, url) => {
      if (url) res.redirect(JSON.parse(url).url);
      else {
        Urls.GetUrl(encrypted_seq, (err, data) => {
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
  getUrl(req, res) {
    if (!req.params.id) {
      res.status(200).json({ response: { success: false, message: 'Url is no valid' } });
      return;
    }

    const encrypted_seq = req.params.id;
    const redis_key = `url-${encrypted_seq}`;

    client.get(redis_key, (err, url) => {
      if (url) res.status(200).json({ response: { success: true, message: { url: JSON.parse(url) } } });
      else {
        Urls.GetUrl(encrypted_seq, (err, data) => {
          if (err) res.status(500).json({ response: { success: false, message: 'Something blew up!' } });
          else {
            if (data) {
              client.set(redis_key, JSON.stringify(data), 'EX', config.redis_expiry);
            }
            res.status(200).json({ response: { success: true, message: { url: data } } });
          }
        });
      }
    });
  },
  addUrl(req, res) {
    if (!req.body.url || !utils.checkUrl(req.body.url)) {
      res.status(200).json({ response: { success: false, message: 'Url is no valid' } });
      return;
    }

    const url = req.body.url;

    Urls.CreateUrl({ url }, (err, data) => {
      if (err) res.status(500).json({ response: { success: false, message: 'Something blew up!' } });
      else {
        if (data) {
          const redis_key = `url-${data.encrypted_seq}`;
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
