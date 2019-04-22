'use strict'

const path = require('path')
const fs = require('fs').promises
const Service = require('egg').Service

let token = ''
let timestamp = 0
let expires = 7200

let nonceStr = (Math.random() + '').substring(2) // 必填，生成签名的随机串
let signature = '' // 必填，签名

class WxService extends Service {
  getCachePath(key){
    const root = this.config.wx.root
    return path.join(root, '..', '..', '_cache', `${ key }.json`)
  }
  getToken(o) {
    let { access_token, expires_in } = o
    expires = expires || 7200
    timestamp = timestamp || 0
    if(timestamp){ // 曾经获取过token
      let now = Date.now()
      if(now > (timestamp + expires * 1e3)){ // token过期
        return ''
      }else if(access_token){ // 既没有过期，又有token
        return access_token
      }else{
        return ''
      }
    }else{
      return ''
    }
  }
  async getNetToken(){
    const { ctx, config } = this
    const { cgi, appId, appsecret } = config.wx
    try{
      ctx.logger.info('access_token from network')
      return ''
      /*
      const result = await ctx.curl(`${ cgi }/token?grant_type=client_credential&appid=${ appId }&secret=${ appsecret}`)
      const json = JSON.parse(result.data)
      if(json.access_token && json.expires_in){
        timestamp = Date.now() // 更新时间戳
        // 存储本地
        const filepath = this.getCachePath('token')
        fs.writeFile(filepath, result.data)
        token = json.access_token || ''
        expires = json.expires_in || 0
        ctx.logger.info('access_token from network')
        return json.access_token
      }else{
        return ''
      }
      */
    }catch(ex){
      ctx.logger.error(ex);
      return ''
    }
  }
  async getLocalToken(){
    const { ctx } = this
    try{
      const filepath = this.getCachePath('token')
      const content = await fs.readFile(filepath, { encoding: 'utf-8' })
      const json = JSON.parse(content)
      ctx.logger.info(json)
      token = json.access_token || ''
      expires = json.expires_in || 0
      ctx.logger.info('access_token from file system')
      return this.getToken(json)
    }catch(ex){
      ctx.logger.error(ex);
      return ''
    }
  }
  async getConfig() {
    const { ctx } = this
    let ak = this.getToken({ access_token: token, expires_in: expires })
    if(ak){
      ctx.logger.info('access_token from memory')
    }else{
      ak = await this.getLocalToken().then((token) => {
        if(token){
          ctx.logger.info('local')
          return token
        }else{
          ctx.logger.info('net')
          return this.getNetToken()
        }
      })
    }
    if(ak){
      ctx.logger.info(`access_token: ${ ak }`)
    }else{
      ctx.logger.info('access_token empty')
    }
    return this.config.wx
  }
}

module.exports = WxService;
