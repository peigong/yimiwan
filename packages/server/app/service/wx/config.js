'use strict'

const path = require('path');
const crypto =  require('crypto');
const fs = require('fs').promises;
const Service = require('egg').Service;

let token = '';
let ticket = '';
let expired = 0;
let timestamp = '';
let nonceStr = '';
let signature = '';

class WxService extends Service {
  getTimestamp(){
    return Math.floor(Date.now() / 1e3);
  }
  getCachePath(key){
    const root = this.config.root;
    return path.join(root, '_cache', `${ key }.json`);
  }
  checkToken(o) {
    let { token, expired } = o;
    expired = expired || 0;
    if(expired){ // 曾经获取过token
      let now = this.getTimestamp();
      if(now > +expired){ // token过期
        return '';
      }else if(token){ // 既没有过期，又有token
        return token;
      }else{
        return '';
      }
    }else{
      return '';
    }
  }
  async getNetToken(key, url){
    const { ctx } = this;
    try{
      const result = await ctx.curl(url);
      const json = JSON.parse(result.data);
      if(json[key] && json.expires_in){
        let now = this.getTimestamp(); // 更新时间戳，以秒为单位
        let expires = +json.expires_in;
        switch (key) {
          case 'access_token':
            token = json.token = json[key];
            expired = now + expires;
            json.timestamp = timestamp = now + '';
            json.nonceStr = nonceStr = (Math.random() + '').substring(2);
            break;
          case 'ticket':
            ticket = json.token = json[key];
            break;
          default:

        }
        json.expired = expired;
        // 存储本地
        fs.writeFile(this.getCachePath(key), JSON.stringify(json));
        ctx.logger.info(`${ key } from network`);
        return json.token;
      }else{
        return '';
      }
    }catch(ex){
      ctx.logger.error(ex);
      return ''
    }
  }
  async getLocalToken(key){
    const { ctx } = this;
    try{
      const content = await fs.readFile(this.getCachePath(key), { encoding: 'utf-8' });
      const json = JSON.parse(content);
      switch (key) {
        case 'access_token':
          token = json.token || '';
          expired = json.expired || 0;
          timestamp = json.timestamp || 0;
          nonceStr = json.nonceStr || '';
          break;
        case 'ticket':
          break;
        default:
      }
      ctx.logger.info(`${ key } from file system`);
      return this.checkToken(json);
    }catch(ex){
      ctx.logger.error(ex);
      return '';
    }
  }
  async getAccessToken(){
    const { ctx, config } = this;
    const { cgi, appId, appsecret } = config.wx;
    let ak = this.checkToken({ token: token, expired: expired });
    if(ak !== ''){
      ctx.logger.info('access_token from memory');
    }
    if('' === ak){
      ak = await this.getLocalToken('access_token');
    }
    if('' === ak){
      ak = await this.getNetToken('access_token', `${ cgi }/token?grant_type=client_credential&appid=${ appId }&secret=${ appsecret}`);
    }
    return ak;
  }
  async getJsApiTicket(token){
    const { ctx, config } = this;
    const { cgi } = config.wx;
    let ak = this.checkToken({ token: ticket, expired: expired });
    if(ak !== ''){
      ctx.logger.info('jsapi_ticket from memory');
    }
    if('' === ak){
      ak = await this.getLocalToken('ticket');
    }
    if('' === ak){
      ak = await this.getNetToken('ticket', `${ cgi }/ticket/getticket?access_token=${ token }&type=jsapi`);
    }
    return ak;
  }
  async getConfig(url) {
    const { ctx, config } = this;
    const { appId } = config.wx;
    token = await this.getAccessToken();
    ticket = await this.getJsApiTicket(token);
    if(!signature){
      const params = {
        noncestr: nonceStr,
        jsapi_ticket: ticket,
        timestamp: timestamp,
        url: url
      };
      const str1 = Object.keys(params).sort().map(key => [key, params[key]].join('=')).join('&');
      const hashCode = crypto.createHash('sha1'); //创建加密类型
      signature = hashCode.update(str1, 'utf8').digest('hex'); //对传入的字符串进行加密
    }
    return {
      appId: appId, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature // 必填，签名
    };
  }
}

module.exports = WxService;
