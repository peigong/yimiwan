'use strict';

const fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller;

class WxController extends Controller {
  async index() {
    const { ctx, config } = this;
    const { logger, params } = ctx;
    const { root } = config;
    const { type, id } = params;
    ctx.body = fs.createReadStream(path.join(root, '_media', type, id));
  }
}

module.exports = WxController;
