'use strict';

module.exports = app => {
  const { controller, model } = app;
  const router = app.router.namespace('/x');

  app.passport.verify(async (ctx, user) => {
    const { username, password } = user;
    const { model, helper } = ctx;
    const targetUser = await model.Account.findOne({
      username: username,
      password: helper.encrypt(password)
    });
    if (!targetUser) {
      return false;
      // throw new Error('账号密码错误')
    }
    return { username };
    // throw new Error('账号密码错误')
    // return { username };
    // return false;
  });
  app.passport.serializeUser(async (ctx, user) => { return user.username; });
  app.passport.deserializeUser(async (ctx, user) => { return { username: user }; });

  // 登录校验
  router.post('/login', app.passport.authenticate('local', {
    successRedirect: '/x/login/success',
    failureRedirect: '/x/login/failure'
  }));
  router.get('/login/success', controller.x.login.success);
  router.get('/login/failure', controller.x.login.failure);
  router.get('/logout', controller.x.login.logout);
};
