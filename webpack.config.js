const [server, client] = require('nullstack/webpack.config');

function removePurge(config) {
  if (config.mode === 'production') {
    // Remove Purge from production plugins
    config.plugins = config.plugins.filter(plugin => {
      // property existent only on Purge
      return !plugin.purgedStats;
    })
  }

  return config;
}

function customClient(...args) {
  const config = client(...args);
  return removePurge(config);
}

function customServer(...args) {
  const config = server(...args);
  config.externals = ['_http_common', 'encoding'];
  return config;
}

module.exports = [customServer, customClient]