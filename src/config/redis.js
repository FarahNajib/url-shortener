/**
 * Created by samialmouhtaseb on 09/11/17.
 */

const redis = require('redis');

const client = redis.createClient(config.redis_url);

client.on('connect', () => {
  console.log('Redis : Success Connected');
});
client.on('error', (err) => {
  console.log(`Redis: ${err}`);
});

module.exports = client;
