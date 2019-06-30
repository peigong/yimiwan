'use strict'

const fs = require('fs');
const url = require('url');
const path = require('path');
const makeDir = require('make-dir');
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
      if(id !== '1237378768e7q8e7r8qwesafdasdfasdfaxss111'){ // 测试状态不创建写文件
        await makeDir(path.join(root, '_media', type));
        const fws = fs.createWriteStream(path.join(root, '_media', pathname));
        await ctx.curl(url, { writeStream: fws });
      }
    }catch(ex){
      pathname = '';
      logger.error(ex);
    }
    return pathname;
  }
  async save(media, settings, multiple = false){
    const { ctx, config } = this;
    const { logger, model, service } = ctx;
    const { wx } = service;
    const { mediaid, originalId } = media;
    const o = { ...media, ...settings };
    const token = await wx.config.getAccessToken()
    o.url = await this.getMedia(token, mediaid, o.type)
    if(!o.url){
      o.url = `${ type }/${ mediaid}`
    }
    if(mediaid !== originalId){
      const updateRule = {
        openid: 'string',
        // topical: 'string', // 主题ID
        refer: 'string', // 参考辅助ID
        type: 'number',
        mediaid: 'string',
        classification: 'object'
      };
      ctx.validate(updateRule, o);
      o.summary = o.summary || o.classification.name || '';
      const { openid, topical, refer, type, url, summary, mediaid, classification } = o;
      const updateTime = Date.now();
      const data = { openid, topical, refer, type, url, summary, mediaid, classification, updateTime };
      if(multiple){
        await model.Media.create(data);
      }else{
        await model.Media.findOneAndUpdate({ openid, topical, refer, 'classification.sn': classification.sn }, data, { upsert: true, useFindAndModify: false });
      }
    }
    return o;
  }
}

module.exports = WxService;
