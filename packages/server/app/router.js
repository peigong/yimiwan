'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { passport, router, controller } = app;

/*
  passport.mount('loginByWeixinClient', {

  });
  */

  router.get('/', controller.home.index);
  router.get('/media/:type/:id', controller.wx.media.index);

  // 代理来自客户端的请求
  router.post('/wx-proxy/config', controller.wx.proxy.getConfig);

  // 处理来自微信的请求
  router.get('/wx-handle/token', controller.wx.handle.checkToken);
};
