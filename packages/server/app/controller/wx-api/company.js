'use strict';

const Controller = require('egg').Controller;
const enums = require('../../enums');

class APIController extends Controller {
  /*
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
    const conditions = { topical: id, refer: 'company', openid: cid };
    const logo = await model.Media.findOne({ 'classification.sn': 'company-logo', ...conditions });
    const licence = await model.Media.findOne({ 'classification.sn': 'company-licence', ...conditions });
    const videos = await model.Media.find({ 'classification.sn': 'company-video', ...conditions });
    const images = await model.Media.find({ type: 1, ...conditions });
    if(data){
      ctx.body = { ...data._doc, logo, licence, videos, images };
    }else{
      ctx.body = {};
    }
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
  */

  /*-> 求职者在公众号上查看管理自己的信息 <-*/
  async getMyCompany(){
    const { app, ctx } = this;
    const { logger, cookies, service, model } = ctx;
    const { wx } = service
    const openid = cookies.get('cid') || '';
    let data = await model.Company.findOne({ openid });
    if(data){
      const conditions = { topical: data._id, refer: enums.Refer.Company, openid: openid };
      const logo = await model.Media.findOne({ 'classification.sn': enums.ClassificationType.CompanyLogo, ...conditions });
      const licence = await model.Media.findOne({ 'classification.sn': enums.ClassificationType.CompanyLicence, ...conditions });
      const videos = await model.Media.find({ 'classification.sn': enums.ClassificationType.CompanyVideo, ...conditions });
      const images = await model.Media.find({ type: enums.MediaType.Image, ...conditions });
      ctx.body = { ...data._doc, logo, licence, videos, images };
    }else{
      ctx.body = {};
    }
  }
  async updateMyCompany(){
    const { app, ctx } = this;
    const { Status } = app;
    const { logger, cookies, request, service, model } = ctx;
    const { wx } = service
    const openid = cookies.get('cid') || '';
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

    ctx.validate(updateRule, request.body);
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
    let data = await model.Company.findOne({ openid });
    if(data){
      await model.Company.update({ openid }, {
        classification,
        title, // 工商注册的全称
        summary, // 公司业务简介
        adress, // 公司地址
        phone, // 联系电话
        email, // 电子邮箱
        linkman // 负责人
      });
    }else{
      data = await model.Company.create({
        openid,
        classification,
        title, // 工商注册的全称
        summary, // 公司业务简介
        adress, // 公司地址
        phone, // 联系电话
        email, // 电子邮箱
        linkman // 负责人
      });
    }
    const topical = data._id;
    const refer = enums.Refer.Company;
    const type = enums.Status.Unaudited;
    const settings = {
      type,
      openid,
      topical,
      refer
    };
    if(logo && logo.mediaid){
      await wx.media.save(logo, { ...settings, classification: { sn: enums.ClassificationType.CompanyLogo, name: '公司LOGO' }})
    }
    if(licence && licence.mediaid){
      await wx.media.save(licence, { ...settings, classification: { sn: enums.ClassificationType.CompanyLicence, name: '公司营业执照' }})
    }
    ctx.status  = Status.NoContent
  }
}

module.exports = APIController;
