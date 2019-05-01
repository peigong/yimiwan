'use strict';

const Controller = require('egg').Controller;

class APIFlowController extends Controller {
  async index(){
    const { ctx } = this
    const { query, service } = ctx
    const { api } = service
    const data = await api.mock.getData(`flow-list/${ query.type }`)
    this.ctx.body = data;
  }
  /*
  async new() => {},
  async create() => {},
  async show() => {},
  async edit() => {},
  async update() => {},
  async destroy() => {}
    */
}

module.exports = APIFlowController;
