'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '^.^';
  }
  async success() {
    this.ctx.body = this.ctx.helper.pack({});
  }
  async failure() {
    this.ctx.body = this.ctx.helper.packError(102, '账号密码错误');
  }
  async logout(){
    await this.ctx.logout()
    const href = encodeURI('/x/pages/wx-user.html');
    this.ctx.redirect(`/x/pages/login.html?${ href }`)
  }
}

module.exports = LoginController;
