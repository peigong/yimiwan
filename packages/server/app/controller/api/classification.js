'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async index(){
    const { ctx } = this;
    const { service, helper } = ctx;
    const { api } = service
    const data = await api.mock.getData('classification')
    ctx.body = helper.pack(data);
  }
}

module.exports = APIController;
