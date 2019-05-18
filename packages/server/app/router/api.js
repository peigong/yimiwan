'use strict';

const auth = require('../middleware/auth');

module.exports = app => {
  const { controller } = app;
  const router = app.router.namespace('/api', auth({}));

  // 业务接口
  router.get('/userinfo', controller.api.user.getUserInfo)

  router.resources('company', '/company', controller.api.company)
  router.resources('job', '/job', controller.api.job)
  router.resources('applicant', '/applicant', controller.api.applicant)
  router.resources('cv', '/cv', controller.api.cv)
  router.resources('message', '/message', controller.api.message)
  router.resources('intent', '/intent', controller.api.intent)
  router.resources('classification', '/classification', controller.api.classification)
};
