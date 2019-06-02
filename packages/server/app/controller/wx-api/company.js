'use strict';

const Controller = require('egg').Controller;

const updateRule = {
  logo: 'object',
  licence: 'object',
  classification: 'object',
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
  async show(){
    const { ctx } = this;
    const { params, cookies, model } = ctx;
    const { id } = params;
    const cid = cookies.get('cid') || '';
    const data = await model.Company.findOne({ _id: id, openid: cid });
    const logo = await model.Media.findOne({ 'classification.sn': 'company-logo', topical: id });
    const licence = await model.Media.findOne({ 'classification.sn': 'company-licence', topical: id });
    const videos = await model.Media.find({ 'classification.sn': 'company-video', topical: id });
    ctx.body = { ...data._doc, logo, licence, videos };
  }
  async create(){
    const { app, ctx } = this;
    const { Status } = app;
    const { logger, cookies, request, service, model } = ctx;
    const { wx } = service
    ctx.validate(updateRule, request.body);
    const openid = cookies.get('cid') || '';
    const unionid = '';
    let active = false;
    const {
      logo,
      licence,
      classification,
      title, // 工商注册的全称
      summary, // 公司业务简介
      adress, // 公司地址
      phone, // 联系电话
      email, // 电子邮箱
      linkman // 负责人
    } = request.body;
    const status = 1;
    const company = await model.Company.create({
      openid,
      unionid,
      active,
      status,
      classification,
      title, // 工商注册的全称
      summary, // 公司业务简介
      adress, // 公司地址
      phone, // 联系电话
      email, // 电子邮箱
      linkman // 负责人
    });
    active = true;
    const type = 1;
    const topical = company._id + '';
    const refer = 'company';
    const settings = {
      type,
      active,
      openid,
      unionid,
      topical,
      refer
    };
    if(logo && logo.mediaid){
      await wx.media.save(logo, { ...settings, classification: { sn: 'company-logo', name: '公司LOGO' }})
    }
    if(licence && licence.mediaid){
      await wx.media.save(licence, { ...settings, classification: { sn: 'company-licence', name: '公司营业执照' }})
    }
    ctx.status  = Status.Created
  }
  async update(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, params, cookies, service, model } = ctx;
    const { wx } = service
    const openid = cookies.get('cid') || '';
    const unionid = '';
    ctx.validate(updateRule, request.body);
    const { id } = params;
    const {
      logo,
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
    const type = 1;
    const active = true;
    const topical = id;
    const refer = 'company';
    const settings = {
      type,
      active,
      openid,
      unionid,
      topical,
      refer
    };
    if(logo && logo.mediaid){
      await wx.media.save(logo, { ...settings, classification: { sn: 'company-logo', name: '公司LOGO' }})
    }
    if(licence && licence.mediaid){
      await wx.media.save(licence, { ...settings, classification: { sn: 'company-licence', name: '公司营业执照' }})
    }
    ctx.status  = Status.NoContent
  }
}

module.exports = APIController;
