/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
var packageJson = require('./../package.json');
var config = require('./../src/config/index');

exports.config = {
  /**
   * Array of application names.
   */
  app_name: [packageJson.name + ':server'],
  /**
   * Your New Relic license key.
   */
  license_key: config.new_relic.license_key,
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: config.new_relic.log_level,
  },
};
