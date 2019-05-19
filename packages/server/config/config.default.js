/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
const wx = require('./wx-conf');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};
  config.root = appInfo.root,

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555799729136_6764';
  config.middleware = [];

  const admin_root = path.join(appInfo.baseDir, '..', 'admin/dist');
  const webapps_root = path.join(appInfo.baseDir, '..', 'webapps/dist');
  config.static =  {
    prefix: '/', dir: [ webapps_root, admin_root ]
  }

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false
    }
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/db',
      options: {},
    },
  };

  config.passportAsiczWeixin = {
    clientID: wx.appId,
    secret: wx.appsecret
  };

  config.logrotator = {};

  // add your user config here
  const userConfig = {
    wx
  };

  return {
    ...config,
    ...userConfig,
  };
};
