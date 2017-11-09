/**
 * Created by samialmouhtaseb on 08/11/17.
 */

module.exports = config = {
  new_relic: {
    license_key: process.env.NEW_RELIC_LICENSE_KEY || '53735ac687d5e970d34245c3a8c8ed73f563c10c',
    log_level: process.env.NEW_RELIC_LOG || 'info',
  },
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost/urlshortener',
  redis_url: process.env.REDIS_URL || 'redis://localhost:6379/1',
  redis_expiry: 1 * 60 * 60 * 24,
  secretKey: process.env.SECRETKEY || '!SaTm@SeCrEt@KeY!',
};
