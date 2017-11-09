/**
 * Created by samialmouhtaseb on 08/11/17.
 */
// bijective encode
ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

module.exports = {
  checkUrl(url) {
    const regexp = /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{0,5})?((\/|\?).*)?$/;
    return regexp.test(url);
  },
  encode(value) {
    if (value == 0) return ALPHABET[0];
    let key = '';
    while (value > 0) {
      key += ALPHABET[value % ALPHABET.length];
      value = parseInt(value / ALPHABET.length);
    }
    return key.split('').reverse().join('');
  },
  decode() {
    let value = 0;
    for (const char of key) {
      value = (value * ALPHABET.length) + ALPHABET.indexOf(char);
    }
    return value;
  },
};
