'use strict';

const Controller = require('egg').Controller;
const enums = require('../../enums')

class APIController extends Controller {
  async index(){
    const { app, ctx } = this;
    const { logger, model } = ctx;
    const conditions = {
      active: true,
      del: false,
      status: enums.Status.Approved
    };
    logger.info(conditions);
    let data = await model.Applicant.find(conditions);
    ctx.body = data;
  }

  async getMyInfo(){
    let data = [];
    const { ctx } = this;
    const { logger, cookies, model } = ctx;
    const openid = cookies.get('cid') || '';
    data = await model.Applicant.findOne({ openid });
    if(data){
      const conditions = { type: enums.MediaType.Image, topical: data._id, refer: enums.Refer.Applicant, openid: openid };
      const images = await model.Media.find(conditions);
      ctx.body = { ...data._doc, images };
    }else{
      ctx.body = {};
    }
  }
  async updateMyInfo(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, cookies, model } = ctx;
    const openid = cookies.get('cid') || '';
    const updateRule = {
      title: 'string', // 求职意向
      name: 'string' // 姓名
    };

    ctx.validate(updateRule, request.body);
    const {
      title, // 求职意向
      name,  // 姓名
      sex,
      address,
      age,
      contact
    } = request.body;
    const data = await model.Applicant.findOne({ openid });
    if(data){
      await model.Applicant.update({ openid }, {
        title, // 求职意向
        name,  // 姓名
        sex,
        address,
        age,
        contact
      });
    }else{
      await model.Applicant.create({
        openid,
        title, // 求职意向
        name,  // 姓名
        sex,
        address,
        age,
        contact
      });
    }
    ctx.status  = Status.NoContent
  }
}

module.exports = APIController;
