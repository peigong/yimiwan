'use strict';

module.exports = app => {
  const { controller } = app;
  const router = app.router.namespace('/wx-api');

  // 业务接口
  router.get('/user-info', controller.wxApi.user.getUserInfo)
  router.put('/user-type', controller.wxApi.user.setUserType)

  router.resources('companies', '/companies', controller.wxApi.company)
  router.resources('classifications', '/classifications', controller.wxApi.classification)

  router.resources('job', '/job', controller.wxApi.job)
  router.resources('applicant', '/applicant', controller.wxApi.applicant)
  router.resources('cv', '/cv', controller.wxApi.cv)
  router.resources('message', '/message', controller.wxApi.message)
  router.resources('intent', '/intent', controller.wxApi.intent)
};
