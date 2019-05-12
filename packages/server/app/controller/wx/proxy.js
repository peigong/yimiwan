'use strict';

const Controller = require('egg').Controller;

class WxProxyController extends Controller {
  async getConfig(){
    const { ctx } = this;
    const { wx } = ctx.service
    const url = ctx.request.body.url || ''
    const conf = await wx.config.getConfig(url)
    ctx.body = conf;
  }
  async authorize(){
    const { ctx, config } = this;
    // const { request } = ctx;
    //  ctx.body = request.query.url;
    const redirect = `http://localhost:8080/wx/handle/oauth2`;
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${ config.wx.appId }&redirect_uri=${ redirect }&response_type=code&scope=snsapi_base&state=auth#wechat_redirect`;
    ctx.redirect(url);
  }
}

module.exports = WxProxyController;
