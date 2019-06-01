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
      conditions.title = conditions.summary = conditions.adress = conditions.phone = conditions.email = conditions.linkman = reg;
    }

    let data = await model.Company.find(conditions);
    ctx.body = data;
  }
  async show(){
    const { ctx } = this;
    const { params, model } = ctx;
    const { id } = params;
    const data = await model.Company.findOne({ _id: id });
    const logo = await model.Media.findOne({ 'classification.sn': 'company-logo', topical: id });
    const licence = await model.Media.findOne({ 'classification.sn': 'company-licence', topical: id });
    const videos = await model.Media.find({ 'classification.sn': 'company-video', topical: id });
    ctx.body = { ...data._doc, logo, licence, videos };
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

    await model.Company.update({ _id: id }, { status });
    ctx.status  = Status.NoContent
  }
}

module.exports = APIController;
