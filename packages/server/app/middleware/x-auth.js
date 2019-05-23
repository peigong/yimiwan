'use strict';

module.exports = options => {
  return async function auth(ctx, next) {
    if(ctx.isAuthenticated()){
      await next();
    }else{
      ctx.body = helper.packError(101, '^.^');
    }
  };
};
