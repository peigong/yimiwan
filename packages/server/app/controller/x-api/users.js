'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async index(){
    const { app, ctx } = this;
    console.log(app.Status);
    const { service, helper, model } = ctx;
    const fields = ['type', 'openid', 'nickname', 'sex', 'province', 'city', 'headimgurl'];
    let data = await model.WxUser.find({}, fields.join(' '));
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
