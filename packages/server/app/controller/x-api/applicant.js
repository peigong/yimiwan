'use strict';

const Controller = require('egg').Controller;
const enums = require('../../enums')

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
      conditions.title = conditions.name = conditions.address = conditions.contact = reg;
    }

    let data = await model.Applicant.find(conditions);
    ctx.body = data;
  }
  async show(){
    let data = [];
    const { ctx } = this;
    const { logger, params, model } = ctx;
    const { id } = params;
    data = await model.Applicant.findOne({ _id: id });
    if(data){
      const conditions = { topical: id, refer: enums.Refer.Applicant, openid: data.openid };
      const images = await model.Media.find({ type: enums.MediaType.Image, ...conditions });
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

    await model.Applicant.update({ _id: id }, { status });
    ctx.status  = Status.NoContent
  }
}

module.exports = APIController;
