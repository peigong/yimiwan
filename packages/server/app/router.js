'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.all('/wx/proxy/config', controller.wx.proxy.getConfig);
  router.resources('flow', '/api/flow', controller.api.flow)
};
