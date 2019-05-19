'use strict'

const Service = require('egg').Service

class WxService extends Service {
  async getSNSResult(url){
    const { ctx } = this;
    const { logger } = ctx;
    let json;
    try{
      const result = await ctx.curl(url)
      json = JSON.parse(result.data)
      logger.info(url);
    }catch(ex){
      logger.error(ex);
      json = null;
    }
    return json;
  }

  /*
  {
    "access_token":"ACCESS_TOKEN",
    "expires_in":7200,
    "refresh_token":"REFRESH_TOKEN",
    "openid":"OPENID",
    "scope":"SCOPE"
 }
 */
  async getOauth2AccessToken(code){
    const { sns, appId, appsecret } = this.config.wx;
    const url = `${ sns }/oauth2/access_token?appid=${ appId }&secret=${ appsecret }&code=${ code }&grant_type=authorization_code`;
    return this.getSNSResult(url);
  }

  /**
  * 由于access_token拥有较短的有效期，当access_token超时后，可以使用refresh_token进行刷新，refresh_token有效期为30天，当refresh_token失效之后，需要用户重新授权。
  * @param token	填写通过access_token获取到的refresh_token参数
  */
  async refreshToken(token){
    const { sns, appId, appsecret } = this.config.wx;
    const url = `${ sns }/oauth2/refresh_token?appid=${ appId }&grant_type=refresh_token&refresh_token=${ token }`;
    return this.getSNSResult(url);
  }

  /**
  * @param openid	用户的唯一标识
  * @param token	网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
  */
  /*
  {
    "openid":" OPENID",
    " nickname": NICKNAME,
    "sex":"1",
    "province":"PROVINCE"
    "city":"CITY",
    "country":"COUNTRY",
    "headimgurl":       "http://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
    "privilege":[ "PRIVILEGE1" "PRIVILEGE2"     ],
    "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
  }
  */
  async getUserInfo(openid, token){
    const { sns } = this.config.wx;
    const url = `${ sns }/userinfo?access_token=${ token }&openid=${ openid }&lang=zh_CN`;
    return this.getSNSResult(url);
  }

  /**
  * 检验授权凭证（access_token）是否有效
  * @param openid	用户的唯一标识
  * @param token	网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
  */
  /*
  返回说明
  正确的JSON返回结果：{ "errcode":0,"errmsg":"ok"}
  错误时的JSON返回示例：{ "errcode":40003,"errmsg":"invalid openid"}
  */
  async checkAccessToken(openid, token){
    const { sns } = this.config.wx;
    const url = `${ sns }/auth?access_token=${ token }&openid=${ openid }`;
    return this.getSNSResult(url);
  }
}

module.exports = WxService;
