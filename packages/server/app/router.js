'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  // 代理来自客户端的请求
  router.post('/wx-proxy/config', controller.wx.proxy.getConfig);

  // 处理来自微信的请求
  router.get('/wx-handle/token', controller.wx.handle.checkToken);
};
