'use strict';

const Controller = require('egg').Controller;

const updateRule = {
  title: 'string', // 求职意向
  name: 'string' // 姓名
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
      conditions.title = conditions.name = reg;
    }

    let data = await model.Applicant.find(conditions);
    ctx.body = data;
  }
  async show(){
    let data = [];
    const { ctx } = this;
    const { logger, params, model } = ctx;
    const { id } = params;
    data = await model.Applicant.findOne({ openid: id });
    const conditions = { topical: id, refer: 'applicant', openid: id };
    const images = await model.Media.find({ type: 1, ...conditions });
    if(data){
      ctx.body = { ...data._doc, images };
    }else{
      ctx.body = {};
    }
  }
  async edit(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, params, model } = ctx;
    const { id } = params;
    ctx.validate(updateRule, request.body);
    const {
      title, // 求职意向
      name  // 姓名
    } = request.body;
    await model.Applicant.findOneAndUpdate({ openid: id }, {
      title, // 求职意向
      name  // 姓名
    }, { useFindAndModify: false });
    ctx.status  = Status.NoContent
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

    await model.Job.update({ openid: id }, { status });
    ctx.status  = Status.NoContent
  }
}

module.exports = APIController;
