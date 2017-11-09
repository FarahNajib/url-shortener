/**
 * Created by samialmouhtaseb on 08/11/17.
 */

module.exports = {
  checkUrl(url) {
    const regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(url);
  },
};
