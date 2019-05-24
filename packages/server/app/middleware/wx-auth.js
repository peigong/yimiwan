'use strict';

module.exports = (options, app) => {
  const { Status } = app;
  const threshold = 5; // 验证尝试失败次数阀值
  const errors = new Map();

  return async function auth(ctx, next) {
    const { cookies, model, helper } = ctx;
    const cid = cookies.get('cid') || '';
    if(cid){
      let counter = errors.get(cid);
      const user = await model.WxUser.findOne({ openid: cid });
      const isAuth = !!(user && user.openid);
      if(isAuth){
        errors.set(cid, 0);
        await next();
      }else{
        counter = counter || 0;
        counter++;
        if(counter > threshold){
          ctx.throw(Status.Forbidden, `try authorize greater than  ${ counter }.`);
        }else{
          errors.set(cid, counter);
          ctx.throw(Status.Unauthorized, 'authorize is fail.');
        }
      }
    }else{ // 没有cookie，不记失败次数
      ctx.throw(Status.Unauthorized, 'credential is not exists.');
    }
  };
};
