'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async index(){
    const { api } = this.ctx.service
    const data = await api.mock.getData('classification')
    this.ctx.body = data;
  }
}

module.exports = APIController;
