'use strict';

const Controller = require('egg').Controller;

class WxProxyController extends Controller {
  async getConfig(){
    const { wx } = this.ctx.service
    const url = this.ctx.request.body.url || ''
    const conf = await wx.config.getConfig(url)
    this.ctx.body = conf;
  }
}

module.exports = WxProxyController;
