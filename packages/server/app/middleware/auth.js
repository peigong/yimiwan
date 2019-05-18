'use strict';

module.exports = options => {
  return async function auth(ctx, next) {
    let isAuth = false;
    const { cookies, model, helper } = ctx;
    const cookieId = cookies.get('cid') || '';
    if(cookieId){
      const user = await model.User.findOne({ cookieId });
      if(user && user.openId){
        ctx.set('x-open-key', user.openId);
        isAuth = true;
      }
    }
    if(isAuth){
      await next();
    }else{
      ctx.body = helper.packError(101, 'authorize is fail.');
    }
  };
};
