'use strict';

const Controller = require('egg').Controller;

class WxProxyController extends Controller {
  async getConfig(){
    const { wx } = this.ctx.service
    const conf = await wx.config.getConfig()
    this.ctx.body = conf;
  }
}

module.exports = WxProxyController;
