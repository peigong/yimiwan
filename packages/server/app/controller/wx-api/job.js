'use strict';

const Controller = require('egg').Controller;
const enums = require('../../enums');

const updateRule = {
  topical: 'string', // 主题ID
  refer: 'string', // 参考辅助ID
  type: 'number',
  title: 'string', // 岗位名称
  // payment: 'string', // 福利待遇
  // workhours: 'string', // 工作时间
  // workaddress: 'string', // 工作地址
  // remark: 'string', // 备注说明
  // jobcontent: 'string', // 工作内容
  // requirement : 'string' // 工作要求
};

class APIController extends Controller {
  async index(){
    const { app, ctx } = this;
    const { logger, cookies, request, model } = ctx;
    /*
    const openid = cookies.get('cid') || '';
    const { type, topical, refer } = request.query;
    const conditions = { openid, type, topical, refer };
    logger.info(conditions);
    */
    const conditions = {
      active: true,
      del: false,
      status: enums.Status.Approved
    };
    let data = await model.Job.find(conditions).populate('topical.company', '_id title classification');
    ctx.body = data;
  }
  async show(){
    const { ctx } = this;
    const { params, cookies, model } = ctx;
    const { id } = params;
    const openid = cookies.get('cid') || '';
    const data = await model.Job.findOne({
      active: true,
      del: false,
      status: enums.Status.Approved,
      _id: id
    });
    if(data){
      const conditions = {
        active: true,
        del: false,
        status: enums.Status.Approved,
        topical: id,
        refer: enums.Refer.Job,
        openid: data.openid
      };
      const images = await model.Media.find({ type: enums.MediaType.Image, ...conditions });
      ctx.body = { ...data._doc, images };
    }else{
      ctx.body = {};
    }
  }
  async create(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, logger, cookies, service, model } = ctx;
    const { wx } = service
    ctx.validate(updateRule, request.body);
    const openid = cookies.get('cid') || '';
    const {
      type,
      topical,
      refer,
      title, // 岗位名称
      payment, // 福利待遇
      workhours, // 工作时间
      workaddress, // 工作地址
      remark, // 备注说明
      jobcontent, // 工作内容
      requirement  // 工作要求
    } = request.body;
    const ref = { topical: {} }
    ref.topical[refer] = topical
    await model.Job.create({
      ...ref,
      openid,
      type,
      refer,
      title, // 岗位名称
      payment, // 福利待遇
      workhours, // 工作时间
      workaddress, // 工作地址
      remark, // 备注说明
      jobcontent, // 工作内容
      requirement  // 工作要求
    });
    ctx.status  = Status.Created
  }
  async update(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, params, model } = ctx;
    const { id } = params;
    ctx.validate(updateRule, request.body);
    const {
      title, // 岗位名称
      payment, // 福利待遇
      workhours, // 工作时间
      workaddress, // 工作地址
      remark, // 备注说明
      jobcontent, // 工作内容
      requirement  // 工作要求
    } = request.body;
    const updateTime = Date.now();
    await model.Job.update({ _id: id }, { $set: {
      updateTime,
      title, // 岗位名称
      payment, // 福利待遇
      workhours, // 工作时间
      workaddress, // 工作地址
      remark, // 备注说明
      jobcontent, // 工作内容
      requirement  // 工作要求
    }});
    ctx.status  = Status.NoContent
  }
  async getMyCompanyJob(){
    const { app, ctx } = this;
    const { logger, cookies, request, model } = ctx;
    const openid = cookies.get('cid') || '';
    const { type, topical, refer } = request.query;
    const ref = {}
    ref[`topical.${ refer }`] = topical
    const conditions = { ...ref, openid, type, refer };
    logger.info(conditions);
    let data = await model.Job.find(conditions);
    ctx.body = data;
  }
}

module.exports = APIController;
