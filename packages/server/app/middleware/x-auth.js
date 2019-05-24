'use strict';

module.exports = (options, app) => {
  const { Status } = app;
  return async function auth(ctx, next) {
    if(ctx.isAuthenticated()){
      await next();
    }else{
      ctx.throw(Status.Unauthorized, '未登录');
    }
  };
};
