'use strict';

const Controller = require('egg').Controller;
const fields = ['sn', 'name'];

class APIController extends Controller {
  async index(){
    const { ctx } = this;
    const { logger, model } = ctx;
    const data = await model.Classification.find({ active: true }, fields.join(' '));
    ctx.body = data;
  }
}

module.exports = APIController;
