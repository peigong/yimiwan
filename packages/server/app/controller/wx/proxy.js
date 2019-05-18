'use strict';

const Controller = require('egg').Controller;

class WxController extends Controller {
  async getConfig(){
    const { ctx } = this;
    const { wx } = ctx.service
    const url = ctx.request.body.url || ''
    const conf = await wx.config.getConfig(url)
    ctx.body = conf;
  }
}

module.exports = WxController;
