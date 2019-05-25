'use strict';

const Controller = require('egg').Controller;

const idRule = {
  id: 'string'
};
const updateRule = {
  sn: 'string',
  name: 'string',
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
    const { sn, name, active } = request.body;
    await model.Classification.create({ sn, name, active });
    ctx.status  = Status.Created
  }
  async update(){
    const { app, ctx } = this;
    const { Status } = app;
    const { request, params, model } = ctx;

    ctx.validate(idRule, params);
    ctx.validate(updateRule, request.body);

    const { id } = params;
    const { sn, name, active } = request.body;

    await model.Classification.update({ _id: id }, { sn, name, active });
    ctx.status  = Status.NoContent
  }
}

module.exports = APIController;
