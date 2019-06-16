'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async index(){
    const { app, ctx } = this;
    const { logger, cookies, model } = ctx;
    const cid = cookies.get('cid') || '';
    let data = await model.Media.find({ openid: cid });
    ctx.body = data;
  }
  async create(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, logger, cookies, service, model } = ctx;
    const { wx } = service
    const updateRule = {
      topical: 'string', // 主题ID
      refer: 'string', // 参考辅助ID
      type: 'number',
      mediaid: 'string',
      classification: 'object'
    };
    ctx.validate(updateRule, request.body);
    const openid = cookies.get('cid') || '';
    const unionid = '';
    const active = false;
    const status = 1; // 待审核
    const settings = {
      active,
      status,
      openid,
      unionid
    };
    const { topical, refer, type, summary, mediaid, url, classification } = request.body;
    await wx.media.save({ topical, refer, type, summary, mediaid, url, classification }, settings, true)
    ctx.status  = Status.Created
  }
}

module.exports = APIController;
