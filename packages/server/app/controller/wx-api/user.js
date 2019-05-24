'use strict';

const Controller = require('egg').Controller;

class APIController extends Controller {
  async getUserInfo(){
    const { ctx } = this;
    const { logger, cookies, model } = ctx;
    const cid = cookies.get('cid') || '';
    let user = await model.WxUser.findOne({ openid: cid });
    let data = {};
    if(user){
      data.type = user.type;
    }
    logger.info(`get user info: ${ JSON.stringify(data) }`)
    ctx.body = data;
  }
  async setUserType(){
    const { ctx } = this;
    const { logger, request, cookies, model } = ctx;
    const cid = cookies.get('cid') || '';
    const type = request.body.type;
    logger.info(`user: ${ cid } set type: ${ type }`);
    await model.WxUser.findOneAndUpdate({ openid: cid }, { type }, { useFindAndModify: false });
    ctx.status  = 204
  }
}

module.exports = APIController;
