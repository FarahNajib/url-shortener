/**
 * Created by samialmouhtaseb on 08/11/17.
 */

module.exports = config = {
  new_relic: {
    license_key: process.env.NEW_RELIC_LICENSE_KEY || 'token',
    log_level: process.env.NEW_RELIC_LOG || 'info',
  },
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost/urlshortener',
  redis_url: process.env.REDIS_URL || 'redis://localhost:6379/0',
  redis_expiry: 1 * 60 * 60 * 24,
  secretKey: process.env.SECRETKEY || 'token',
  encrypted_seq_key: process.env.ENCRYPTED_SEQ_KEY || 'encrypted_seq_key',
  rollbar_token: process.env.ROLLBAR_ACCESS_TOKEN || 'token'
};
