'use strict';

module.exports = options => {
  return async function auth(ctx, next) {
    const { app, cookies, helper, logger } = ctx;
    const { administrators } = app.config.wx;
    const cid = cookies.get('cid') || '';
    if(cid){
      if(administrators.includes(cid)){
        await next();
      }else{
        ctx.body = helper.packError(102, 'invalid credential.');
      }
    }else{ // 没有cookie
      ctx.body = helper.packError(101, 'credential is not exists.');
    }
  };
};
