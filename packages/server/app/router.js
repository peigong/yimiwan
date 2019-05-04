'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 代理来自客户端的请求
  router.post('/wx/proxy/config', controller.wx.proxy.getConfig);

  // 处理来自微信的请求
  router.get('/wx/handle/token', controller.wx.handle.checkToken);

  // 业务接口
  router.resources('company', '/api/company', controller.api.company)
  router.resources('job', '/api/job', controller.api.job)
  router.resources('applicant', '/api/applicant', controller.api.applicant)
  router.resources('cv', '/api/cv', controller.api.cv)
  router.resources('message', '/api/message', controller.api.message)
  router.resources('intent', '/api/intent', controller.api.intent)
  router.resources('classification', '/api/classification', controller.api.classification)
};
