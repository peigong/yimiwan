'use strict';

const Controller = require('egg').Controller;

const idRule = {
  id: 'string'
};
const updateRule = {
  title: 'string', // 工商注册的全称
  summary: 'string', // 公司业务简介
  adress: 'string', // 公司地址
  phone: 'string', // 联系电话
  email: 'string', // 电子邮箱
  linkman: 'string' // 负责人
};

class APIController extends Controller {
  async index(){
    let data = [];
    const { ctx } = this;
    const { logger, cookies, model } = ctx;
    const cid = cookies.get('cid') || '';
    if(cid){
      data = await model.Company.find({ openid: cid });
    }
    ctx.body = data;
  }
  async create(){
    const { app, ctx } = this;
    const { Status } = app;
    const { logger, cookies, request, service, model } = ctx;
    const { wx } = service
    ctx.validate(updateRule, request.body);
    const openid = cookies.get('cid') || '';
    const unionid = '';
    const active = false;
    const {
      licence,
      classification,
      title, // 工商注册的全称
      summary, // 公司业务简介
      adress, // 公司地址
      phone, // 联系电话
      email, // 电子邮箱
      linkman // 负责人
    } = request.body;
    if(licence && licence.id){
      licence.type = 1;
      const token = await wx.config.getAccessToken()
      const url = await wx.media.getMedia(token, licence.id)
      licence.url =  await wx.media.save(licence.type, url)
    }
    await model.Company.create({
      openid,
      unionid,
      active,
      licence,
      classification,
      title, // 工商注册的全称
      summary, // 公司业务简介
      adress, // 公司地址
      phone, // 联系电话
      email, // 电子邮箱
      linkman // 负责人
    });
    ctx.status  = Status.Created
  }
  async update(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, params, model } = ctx;

    ctx.validate(idRule, params);
    ctx.validate(updateRule, request.body);

    const { id } = params;
    const {
      licence,
      classification,
      title, // 工商注册的全称
      summary, // 公司业务简介
      adress, // 公司地址
      phone, // 联系电话
      email, // 电子邮箱
      linkman // 负责人
    } = request.body;

    await model.Company.update({ _id: id }, {
      licence,
      classification,
      title, // 工商注册的全称
      summary, // 公司业务简介
      adress, // 公司地址
      phone, // 联系电话
      email, // 电子邮箱
      linkman // 负责人
    });
    ctx.status  = Status.NoContent
  }
}

module.exports = APIController;
