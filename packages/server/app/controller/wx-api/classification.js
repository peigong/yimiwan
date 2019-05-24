'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async index(){
    const { ctx } = this;
    const { service } = ctx;
    const { api } = service
    const data = await api.mock.getData('classification')
    ctx.body = data;
  }
}

module.exports = APIController;
