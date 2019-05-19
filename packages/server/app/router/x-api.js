'use strict';

const auth = require('../middleware/x-auth');

module.exports = app => {
  const { controller } = app;
  const router = app.router.namespace('/x-api', auth({}));
  
  router.resources('user', '/user', controller.xApi.user)
};
