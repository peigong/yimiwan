'use strict';

const Controller = require('egg').Controller;
const fields = ['openid', 'unionid', 'username'];

const idRule = {
  id: 'string'
};
const updateRule = {
  username: 'string',
  password: 'string'
};

class APIController extends Controller {
  async index(){
    const { ctx } = this;
    const { service, helper, model } = ctx;
    let data = await model.Account.find({}, fields.join(' '));
    ctx.body = data
  }
  async show(){
    const { ctx } = this;
    const { params, helper, model } = ctx;

    ctx.validate(idRule, params);

    const openid = params.id || '';
    let data = await model.Account.findOne({ openid }, fields.join(' '));
    ctx.body = data
  }
  async update(){
    const { ctx } = this;
    const { request, params, helper, model } = ctx;

    ctx.validate(idRule, params);
    ctx.validate(updateRule, request.body);

    const openid = params.id || '';
    const { username, password } = request.body;

    await model.Account.findOneAndUpdate({ openid }, {
      username: username,
      password: helper.encrypt(password)
    }, { upsert: true, useFindAndModify: false });
    ctx.status  = 204
  }
  /*
  async new() => {},
  async create() => {},
  async edit() => {},
  async destroy() => {}
    */
}

module.exports = APIController;
