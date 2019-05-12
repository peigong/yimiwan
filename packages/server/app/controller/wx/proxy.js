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
    const { ctx } = this;
    const { request } = ctx;
    ctx.body = request.query.url;
  }
}

module.exports = WxProxyController;
