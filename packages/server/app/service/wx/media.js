'use strict'

const fs = require('fs');
const url = require('url');
const path = require('path');
const Service = require('egg').Service;

class WxService extends Service {
  async getMedia(token, id){
    const { ctx } = this;
    const { logger } = ctx;
    const { cgi } = this.config.wx;
    const url = `${ cgi }/media/get?access_token=${ token }&media_id=${ id }`;
    let result;
    try{
      const result = await ctx.curl(url)
      const json = JSON.parse(result.data)
      console.log(json);
      if(json.video_url){
        logger.info(url);
        result = json.video_url;
      }else{
        result = '';
        logger.error(json);
      }
    }catch(ex){
      result = '';
      logger.error(ex);
    }
    return result;
  }
  async save(type, media){
    type = type + ''
    const { ctx, config } = this;
    const { logger } = ctx;
    const { root } = config;
    try{
      const o = url.parse(media)
      const pathname = o.pathname
      if(pathname){
        const fws = fs.createWriteStream(path.join(root, type, pathname));
        await ctx.curl(media, { writeStream: fws })
      }
      return pathname;
    }catch(ex){
      logger.error(ex);
      throw ex;
    }
  }
}

module.exports = WxService;
