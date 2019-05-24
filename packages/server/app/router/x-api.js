'use strict';

module.exports = app => {
  const { controller } = app;
  const router = app.router.namespace('/x-api');

  router.resources('users', '/users', controller.xApi.users)
  router.resources('accounts', '/accounts', controller.xApi.accounts)
};