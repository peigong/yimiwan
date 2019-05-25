'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async index(){
    let data = [];
    const { ctx } = this;
    const { logger, cookies, model } = ctx;
    const cid = cookies.get('cid') || '';
    if(cid){
      data = await model.Company.find({ openid: cid });
    }
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
