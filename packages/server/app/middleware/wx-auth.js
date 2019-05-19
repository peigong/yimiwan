'use strict';

module.exports = options => {
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
          ctx.body = helper.packError(102, `try authorize greater than  ${ counter }.`);
        }else{
          errors.set(cid, counter);
          ctx.body = helper.packError(101, 'authorize is fail.');
        }
      }
    }else{ // 没有cookie，不记失败次数
      ctx.body = helper.packError(101, 'credential is not exists.');
    }
  };
};
