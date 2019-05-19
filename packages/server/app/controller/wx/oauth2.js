'use strict';

const Controller = require('egg').Controller;

class WxController extends Controller {
  /**
  * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
  */
  async authorize(){
    const { ctx, config } = this;
    const { logger, request } = ctx;
    const { wx } = config;
    const origin = request.origin;
    const url = request.query.url;

    /*
    * 1、以snsapi_base为scope发起的网页授权，是用来获取进入页面的用户的openid的，并且是静默授权并自动跳转到回调页的。用户感知的就是直接进入了回调页（往往是业务页面）
    * 2、以snsapi_userinfo为scope发起的网页授权，是用来获取用户的基本信息的。但这种授权需要用户手动同意，并且由于用户同意过，所以无须关注，就可在授权后获取该用户的基本信息。
    */
    const scope = 'snsapi_userinfo';
    const redirect_uri = encodeURIComponent(`${ origin }/oauth2/cb?url=${ url }`);
    const redirect = `${ wx.authorize }?appid=${ wx.appId }&redirect_uri=${ redirect_uri }&response_type=code&scope=${ scope }&state=1#wechat_redirect`;
    logger.info(`wei xin authorize url: ${ redirect }`)
    ctx.redirect(redirect);
  }
  async callback(){
    const { ctx } = this;
    const { logger, request, cookies, model, service } = ctx;
    const { sns } = service.wx;
    const url = request.query.url;
    const code = request.query.code;
    if(code){
      const timestamp = Date.now();
      const token = await sns.getOauth2AccessToken(code);
      if(token && !token.errcode){
        const { openid, access_token } = token;
        const userinfo = await sns.getUserInfo(openid, access_token);
        if(userinfo && !userinfo.errcode){
          cookies.set('cid', openid);
          let user = await model.WxUser.findOne({ openid });
          const data = { timestamp, ...token, ...userinfo };
          if(user){
            await model.WxUser.findOneAndUpdate({ openid }, data, { useFindAndModify: false });
          }else{
            user = new model.WxUser(data);
            await user.save();
          }
        }
      }
    }
    logger.info(`wei xin authorize user code: ${ code }`)
    if(url){
      ctx.redirect(url);
    }else{
      ctx.body = { code, url };
    }
  }
}

module.exports = WxController;
