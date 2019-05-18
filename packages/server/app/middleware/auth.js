'use strict';

module.exports = options => {
  return async function auth(ctx, next) {
    let isAuth = false;
    const { cookies, model, helper } = ctx;
    const cid = cookies.get('cid') || '';
    if(cid){
      const user = await model.User.findOne({ openId: cid });
      isAuth = !!(user && user.openId);
    }
    if(isAuth){
      await next();
    }else{
      ctx.body = helper.packError(101, 'authorize is fail.');
    }
  };
};
