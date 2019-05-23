'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async index(){
    const { ctx } = this;
    const { service, helper, model } = ctx;
    const fields = ['openid', 'unionid', 'username'];
    let data = await model.Account.find({}, fields.join(' '));
    ctx.body = helper.pack(data);
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
