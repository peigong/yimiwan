'use strict'

const path = require('path')
const fs = require('fs').promises
const Service = require('egg').Service

class APIMockService extends Service {
  getPath(key){
    const root = this.config.baseDir
    return path.join(root, '_mock', `${ key }.json`)
  }
  async getData(key){
    const { ctx } = this
    try{
      const content = await fs.readFile(this.getPath(key), { encoding: 'utf-8' })
      const json = JSON.parse(content)
      ctx.logger.info(`${ key } => ${ content }`)
      return json
    }catch(ex){
      ctx.logger.error(ex);
      return {}
    }
  }
  saveData(key, json){
    const { ctx } = this
    const content = JSON.stringify(json)
    fs.writeFile(this.getPath(key), content)
    ctx.logger.info(`${ key } => ${ content }`)
  }
}

module.exports = APIMockService;
