'use strict';

const Controller = require('egg').Controller;
const enums = require('../../enums');

const updateRule = {
  topical: 'string', // 主题ID
  // refer: 'string', // 参考辅助ID
  type: 'number',
  title: 'string',
  to: 'string'
};

class APIController extends Controller {
  async index(){
    const { app, ctx } = this;
    const { logger, cookies, model } = ctx;
    const openid = cookies.get('cid') || '';
    const conditions = {
      /*
      active: true,
      del: false,
      status: enums.Status.Approved
      */
      $or: [ { openid }, { to: openid } ],
      type: { $ne: enums.MessageType.ToMessage }
    };
    let data = await model.Message.find(conditions);
    ctx.body = data;
  }
  async show(){
    const { app, ctx } = this;
    const { logger, cookies, params, model } = ctx;
    const { id } = params;
    const openid = cookies.get('cid') || '';
    const conditions = {
      type: enums.MessageType.ToMessage,
      topical: id,
      to: openid
      /*
      active: true,
      del: false,
      status: enums.Status.Approved
      */
    };
    let data = await model.Message.find(conditions);
    ctx.body = data;
  }
  async create(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, logger, cookies, model } = ctx;
    ctx.validate(updateRule, request.body);
    const openid = cookies.get('cid') || '';
    const {
      type,
      topical,
      refer,
      to,
      title,
      content
    } = request.body;
    await model.Message.create({
      openid,
      type,
      topical,
      refer,
      to,
      title,
      content
    });
    ctx.status  = Status.Created
  }
}

module.exports = APIController;
