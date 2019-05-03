/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

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

  const webapps_root = path.join(appInfo.baseDir, '..', 'webapps/dist');
  console.log(webapps_root);
  config.static =  {
    prefix: '/', dir: webapps_root
  }

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  // add your user config here
  const userConfig = {
    wx: {
      root: appInfo.root,
      cgi: 'https://api.weixin.qq.com/cgi-bin',
      appId: 'wx9c1d647c2717b64e',
      appsecret:  '526abee06e5ab3654aa12bd389f45f85',
      token: 'yimiwan'
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
