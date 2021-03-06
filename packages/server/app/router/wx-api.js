'use strict';

module.exports = app => {
  const { controller } = app;
  const router = app.router.namespace('/wx-api');

  // 业务接口
  router.get('/user-info', controller.wxApi.user.getUserInfo)
  router.put('/user-type', controller.wxApi.user.setUserType)

  router.resources('classifications', '/classifications', controller.wxApi.classification)
  router.resources('media', '/media', controller.wxApi.media)

  router.resources('companies', '/companies', controller.wxApi.company)
  router.get('/my-company', controller.wxApi.company.getMyCompany)
  router.put('/my-company', controller.wxApi.company.updateMyCompany)

  router.resources('job', '/job', controller.wxApi.job)
  router.get('/my-company-job', controller.wxApi.job.getMyCompanyJob)

  // 求职者
  router.resources('applicant', '/applicant', controller.wxApi.applicant)
  router.get('/my-applicant-info', controller.wxApi.applicant.getMyInfo)
  router.put('/my-applicant-info', controller.wxApi.applicant.updateMyInfo)

  router.resources('message', '/message', controller.wxApi.message)
};
