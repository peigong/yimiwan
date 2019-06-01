'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async index(){
    const { app, ctx } = this;
    const { service, request, model } = ctx;
    const { classification, keywords, status } = request.query;

    const conditions = {};
    if(classification){
      conditions['classification.sn'] = classification;
    }
    if(+status){
      conditions.status = status;
    }
    if(keywords){
      const reg = { $regex: keywords }
      conditions.summary = reg;
    }

    let data = await model.Media.find(conditions);
    ctx.body = data;
  }
  async show(){
    const { ctx } = this;
    const { params, model } = ctx;
    const { id } = params;
    const data = await model.Media.findOne({ _id: id });
    ctx.body = data
  }
  async create(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, model } = ctx;
    const updateRule = {
      openid: 'string',
      status: 'number',
      topical: 'string', // 主题ID
      refer: 'string', // 参考辅助ID
      type: 'number',
      mediaid: 'string',
      classification: 'object'
    };
    ctx.validate(updateRule, request.body);
    const { openid, unionid, status, topical, refer, type, id, summary, mediaid, classification } = request.body;
    await model.Media.create({ openid, unionid, status, topical, refer, type, id, summary, mediaid, classification });
    ctx.status  = Status.Created
  }
  async update(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, params, model } = ctx;
    const updateRule = {
      status: 'number'
    };
    const { id } = params;
    ctx.validate(updateRule, request.body);
    const { status } = request.body;

    await model.Media.update({ _id: id }, { status });
    ctx.status  = Status.NoContent
  }
}

module.exports = APIController;
