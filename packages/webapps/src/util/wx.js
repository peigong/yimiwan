import { proxy } from './axios'
import { debug, jsApiList } from '../conf/wx'

const wx = window.wx || null
const loc = window.location || {}
const href = loc.href || ''
const hash = loc.hash || ''
let url = href
if(hash){
  const idx = href.indexOf(hash)
  if(idx > -1){
    url = href.substr(0, idx)
  }
}

const jsApi = new Map()
jsApiList.forEach(key => {
  jsApi.set(key, false)
})

let ready = false

if(wx){
  proxy.post('config', { url: url })
  .then(config => {
    wx.config(Object.assign({}, { debug, jsApiList }, config));
    wx.ready(async () =>  {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      const checkResult = await exec('checkJsApi', { jsApiList })
      Object.keys(checkResult).forEach(key => {
        jsApi.set(key, !!checkResult[key])
      })
      ready = true
    });
    wx.error(function(res){
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log(res);
    });
  })
  .catch(err => {
    console.log(err.message);
  })
}

function exec(command, options){
  return new Promise((resolve, reject) => {
    const base = {
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {}
    }
    wx[command]({
      ...base,
      ...options
    })
  })
}

let timer = null
const commands = []

function create(command){
  return function(options){
    if(wx && ready){
      exec(command, options)
    }else{
      if(!timer){
        timer = setTimeout()
      }
      commands.push({ commands, options })
    }
  }
}

export const chooseImage = create('chooseImage')
