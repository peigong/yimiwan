'use strict';

const Controller = require('egg').Controller;

const updateRule = {
  sn: 'string',
  name: 'string',
  parent: 'object',

  position: 'number',
  active: 'boolean'
};

class APIController extends Controller {
  async index(){
    const { ctx } = this;
    const { logger, model } = ctx;
    const data = await model.Classification.find({});
    ctx.body = data;
  }
  async create(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, model } = ctx;
    ctx.validate(updateRule, request.body);
    const { sn, name, remark, parent, position, active } = request.body;
    await model.Classification.create({ sn, name, remark, parent, position, active });
    ctx.status  = Status.Created
  }
  async update(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, params, model } = ctx;
    ctx.validate(updateRule, request.body);
    const { id } = params;
    const { sn, name, remark, parent, position, active } = request.body;

    await model.Classification.update({ _id: id }, { sn, name, remark, parent, position, active });
    ctx.status  = Status.NoContent
  }
  async getList(){
    const { app, ctx } = this;
    const { logger, params, model } = ctx;
    const { parent } = params;
    const data = await model.Classification.find({ 'parent.sn': parent }).sort('position');
    ctx.body = data;
  }
}

module.exports = APIController;
