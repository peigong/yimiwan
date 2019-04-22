/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555799729136_6764';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    wx: {
      root: appInfo.root,
      cgi: 'https://api.weixin.qq.com/cgi-bin',
      appId: 'wx9c1d647c2717b64e',
      appsecret:  '526abee06e5ab3654aa12bd389f45f85'
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
