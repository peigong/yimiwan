'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '^.^';
  }
  async logout(){
    const { ctx } = this
    await ctx.logout()
    const url = ctx.request.query.url || '';
    ctx.redirect(`/x/pages/login.html?${ encodeURI(url) }`)
  }
}

module.exports = LoginController;
