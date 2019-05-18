'use strict';

const Controller = require('egg').Controller;

class WxController extends Controller {
  async authorize(){
    const { ctx, config } = this;
    const { logger, request } = ctx;
    const { wx } = config;
    const origin = request.origin;
    const url = request.query.url;
    const redirect_uri = encodeURIComponent(`${ origin }/oauth2/cb?url=${ url }`);
    const redirect = `${ wx.authorize }?appid=${ wx.appId }&redirect_uri=${ redirect_uri }&response_type=code&scope=snsapi_base&state=1#wechat_redirect`;
    logger.info(`wei xin authorize url: ${ redirect }`)
    ctx.redirect(redirect);
  }
  async callback(){
    const { ctx } = this;
    const { logger, request, cookies, model } = ctx;
    const code = request.query.code;
    const url = request.query.url;
    cookies.set('cid', code);
    let user = await model.User.findOne({ openId: code });
    if(!user){
      user = new model.User({ openId: code });
      user.save();
    }
    logger.info(`wei xin authorize user openId: ${ code }`)
    if(url){
      ctx.redirect(url);
    }else{
      ctx.body = { code, url };
    }
  }
}

module.exports = WxController;
