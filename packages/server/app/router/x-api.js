'use strict';

module.exports = app => {
  const { controller } = app;
  const router = app.router.namespace('/x-api');

  router.resources('users', '/users', controller.xApi.users)
  router.resources('accounts', '/accounts', controller.xApi.accounts)
  router.get('/classifications/list/:parent', controller.xApi.classification.getList)
  router.resources('classifications', '/classifications', controller.xApi.classification)
  router.resources('companies', '/companies', controller.xApi.company)
  router.resources('media', '/media', controller.xApi.media)
  router.resources('job', '/job', controller.xApi.job)
  router.resources('applicant', '/applicant', controller.xApi.applicant)
  router.resources('messages', '/messages', controller.xApi.message)
};
