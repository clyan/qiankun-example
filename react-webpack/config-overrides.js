// config-overrides.js
module.exports = function override(config) {
  // 确保导出为 UMD 格式
  config.output.library = 'react-webpack';
  config.output.libraryTarget = 'umd';
  config.output.globalObject = 'window';

  const htmlPlugin = config.plugins.find((plugin) => plugin);

  if (htmlPlugin) {
    htmlPlugin.userOptions.base = {
      href: '%PUBLIC_URL%/',
    };
  }

  return config;
};
