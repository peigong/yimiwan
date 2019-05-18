'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async getUserInfo(){
    const { ctx } = this;
    const { cookies, model, helper } = ctx;
    const cookieId = cookies.get('cid') || '';
    let user = await model.User.findOne({ cookieId });
    let data = {};
    if(user){
      data.type = user.type;
    }
    ctx.body = helper.pack(data);
  }
}

module.exports = APIController;
