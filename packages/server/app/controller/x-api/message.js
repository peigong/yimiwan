'use strict';

const Controller = require('egg').Controller;
const enums = require('../../enums')

const updateRule = {
  title: 'string', // 消息主题
  content: 'string' // 消息内容
};

class APIController extends Controller {
  async index(){
    const { app, ctx } = this;
    const { service, request, model } = ctx;
    const { keywords, status } = request.query;

    const conditions = {};
    if(+status){
      conditions.status = status;
    }
    if(keywords){
      const reg = { $regex: keywords }
      conditions.title = conditions.content = reg;
    }

    let data = await model.Message.find(conditions);
    ctx.body = data;
  }
  async create(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, logger, model } = ctx;
    ctx.validate(updateRule, request.body);
    const openid = 'system';
    const status =  enums.Status.Approved;
    const type = enums.MessageType.ToMessage;
    const {
      topical,
      to,
      title,
      content
    } = request.body;
    await model.Message.create({
      openid,
      status,
      type,
      topical,
      to,
      title,
      content
    });
    ctx.status  = Status.Created
  }
  async update(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, params, model } = ctx;
    const rule = {
      status: 'number'
    };
    const { id } = params;
    ctx.validate(rule, request.body);
    const { status } = request.body;

    await model.Message.update({ _id: id }, { status });
    ctx.status  = Status.NoContent
  }
}

module.exports = APIController;
