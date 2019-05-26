'use strict';

const fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller;

class WxController extends Controller {
  async index() {
    const { ctx, config } = this;
    const { logger, params } = ctx;
    const { root } = config;
    const pathname = params.pathname || ''
    if(pathname){
      ctx.body = fs.createReadStream(path.join(root, '_media', pathname));
    }else {
      ctx.body = '^.^';
    }
  }
}

module.exports = WxController;
