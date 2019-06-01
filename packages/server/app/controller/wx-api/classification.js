'use strict';

const Controller = require('egg').Controller;
const fields = ['sn', 'name'];

class APIController extends Controller {
  async index(){
    const { ctx } = this;
    const { logger, model } = ctx;
    const data = await model.Classification.find({ active: true, 'parent.sn': 'top' }, fields.join(' ')).sort('position');
    ctx.body = data;
  }
  async show(){
    const { ctx } = this;
    const { params, model } = ctx;
    const { id } = params;
    const data = await model.Classification.find({ active: true, 'parent.sn': id }, fields.join(' ')).sort('position');
    ctx.body = data
  }
}

module.exports = APIController;
