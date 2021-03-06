/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
const wx = require('./wx-conf');
const errorHandler = require('../app/middleware/error-handler');
const xAuth = require('../app/middleware/x-auth');
const wxAuth = require('../app/middleware/wx-auth');

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
  config.middleware = [ 'errorHandler', 'xAuth', 'wxAuth' ];
  config.errorHandler = {
    match: [ '/x', '/x-api', '/wx-api' ]
  };
  config.xAuth = {
    match: [ '/x-api' ]
  };
  config.wxAuth = {
    match: [ '/wx-api' ]
  };

  const public_root = path.join(appInfo.baseDir, 'app', 'public');
  const webapps_root = path.join(appInfo.baseDir, '..', 'webapps/dist');
  const admin_root = path.join(appInfo.baseDir, '..', 'admin/dist');
  config.static =  {
    prefix: '/', dir: [ public_root, webapps_root, admin_root ]
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

  config.passportLocal = {};

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
