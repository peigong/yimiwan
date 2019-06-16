'use strict';

const Controller = require('egg').Controller;

const updateRule = {
  topical: 'string', // 主题ID
  refer: 'string', // 参考辅助ID
  type: 'number',
  title: 'string', // 岗位名称
  payment: 'string', // 福利待遇
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
    const { type, keywords, status } = request.query;
    const conditions = {};
    if(+type){
      conditions.type = type;
    }
    if(+status){
      conditions.status = status;
    }
    if(keywords){
      const reg = { $regex: keywords }
      conditions.title = conditions.payment = conditions.workhours = conditions.workaddress = conditions.remark = conditions.jobcontent = conditions.requirement = reg;
    }
    let data = await model.Job.find(conditions);
    ctx.body = data;
  }
  async show(){
    const { ctx } = this;
    const { params, cookies, model } = ctx;
    const { id } = params;
    const data = await model.Job.findOne({ _id: id });
    ctx.body = data;
  }
  async create(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, logger, cookies, service, model } = ctx;
    const { wx } = service
    ctx.validate(updateRule, request.body);
    const openid = cookies.get('cid') || '';
    const unionid = '';
    const active = false;
    const del = false;
    const status = 1; // 待审核
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
    await model.Job.create({
      openid,
      unionid,
      active,
      del,
      status,
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
  async edit(){
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
    await model.Job.update({ _id: id }, { $set: {
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

    await model.Job.update({ _id: id }, { status });
    ctx.status  = Status.NoContent
  }
}

module.exports = APIController;
