'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async index(){
    const { ctx } = this;
    const { service } = ctx;
    const { api } = service
    const data = await api.mock.getData('cv')
    ctx.body = data;
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

module.exports = APIController;
