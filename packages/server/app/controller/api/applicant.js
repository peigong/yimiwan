'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async index(){
    const { api } = this.ctx.service
    const data = await api.mock.getData('applicant')
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

module.exports = APIController;
