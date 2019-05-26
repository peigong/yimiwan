'use strict'

const fs = require('fs');
const url = require('url');
const path = require('path');
const Service = require('egg').Service;

class WxService extends Service {
  async getMedia(token, id, type){
    type = type +  '';
    const { ctx, config } = this;
    const { logger } = ctx;
    const { root, wx } = config;
    const { file } = wx;
    const url = `${ file }/media/get?access_token=${ token }&media_id=${ id }`;
    let pathname;
    try{
      logger.info(url);
      pathname = path.join(type, id);
      const fws = fs.createWriteStream(path.join(root, '_media', pathname));
      await ctx.curl(url, { writeStream: fws });
    }catch(ex){
      pathname = '';
      logger.error(ex);
    }
    return pathname;
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
