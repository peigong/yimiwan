'use strict';

module.exports = app => {
  const { controller } = app;
  const router = app.router.namespace('/oauth2');

  router.get('/authorize', controller.wx.oauth2.authorize);
  router.get('/cb', controller.wx.oauth2.callback);
};
