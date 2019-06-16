'use strict';

const Controller = require('egg').Controller;

const updateRule = {
  title: 'string', // 求职意向
  name: 'string' // 姓名
};

class APIController extends Controller {
  async index(){
    let data = [];
    const { ctx } = this;
    const { logger, cookies, model } = ctx;
    const openid = cookies.get('cid') || '';
    data = await model.Applicant.findOne({ openid });
    const conditions = { topical: openid, refer: 'applicant', openid: openid };
    const images = await model.Media.find({ type: 1, ...conditions });
    if(data){
      ctx.body = { ...data._doc, images };
    }else{
      ctx.body = {};
    }
  }
  async create(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, cookies, model } = ctx;
    const openid = cookies.get('cid') || '';
    ctx.validate(updateRule, request.body);
    const {
      title, // 求职意向
      name  // 姓名
    } = request.body;
    await model.Applicant.findOneAndUpdate({ openid }, {
      title, // 求职意向
      name  // 姓名
    }, { upsert: true, useFindAndModify: false });
    ctx.status  = Status.NoContent
  }
}

module.exports = APIController;
