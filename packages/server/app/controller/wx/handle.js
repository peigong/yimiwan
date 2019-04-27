'use strict';

const crypto =  require('crypto')
const Controller = require('egg').Controller;

class WxHandleController extends Controller {
  async checkToken(){
    const result = ''
    const { ctx, config } = this
    const token = config.wx.token
    const { signature, timestamp, nonce, echostr } = ctx.request.query
    if(signature && timestamp && nonce && echostr){
      const params = [ token, timestamp,  nonce ]
      const str1 = params.sort().join('')
      const hashCode = crypto.createHash('sha1'); //创建加密类型
      const sha1 = hashCode.update(str1, 'utf8').digest('hex'); //对传入的字符串进行加密
      if(sha1 === signature){
        result = echostr
      }else{
        result = 'match miss.'
      }
    }else{
      result = 'params error.';
    }
    this.ctx.body = result;
  }
}

module.exports = WxHandleController;
