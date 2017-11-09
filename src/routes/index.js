/**
 * Created by samialmouhtaseb on 08/11/17.
 */

const api = require('./api');

module.exports = function (app) {
  // -----------------Views-------------------
  app.get('/', api.views.index);

  // ------------------Urls API---------------------
  /**
     * @api {get} /api/url/:id Get original Url from Shortner
     * @apiName Get Url
     * @apiGroup Urls
     *
     * @apiParam {String} id Mandatory UrlId
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "response": {
     *       "success": "true",
     *       "message": {"url": "Url Object"}
     *       }
     *     }
     */
  app.get('/api/url/:id', api.urls.getUrl);

  /**
     * @api {post} /api/url Shortner Url
     * @apiName Shortner Url
     * @apiGroup Urls
     *
     * @apiExample {json} Example body:
     *     body:
     *     {
     *       "url": "http://www.example.com"
     *     }
     *
     * @apiParam {String} url Mandatory UrlId
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *      "response": {
     *       "success": "true",
     *       "message": {"url": "Url Object"}
     *       }
     *     }
     */
  app.post('/api/url', api.urls.addUrl);

  // ----------------Error Handler-------------------
  app.use(api.error.error);
  
  // -----------------Urls Views -------------------
  app.get('/:id', api.urls.redirectUrl);
};
