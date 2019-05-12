'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async getUserInfo(){
    const { cookies, model } = ctx;
    const cookieId = cookies.get('cid') || '';
    model.User.findOne({ cookieId });
  }
}

module.exports = APIController;
