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
    wx.ready(function(o){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        ready = true
        console.log(o);
    });
    wx.error(function(res){
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log(res);
    });
    wx.checkJsApi({
      jsApiList: jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function(res) {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        console.log(res);
        const checkResult = res.checkResult || {}
        Object.keys(checkResult).forEach(key => {
          jsApi.set(key, !!checkResult[key])
        })
      }
    });
  })
  .catch(err => {
    console.log(err.message);
  })
}

function exec(command, options){
  console.log(command);
  console.log(options);
  return new Promise((resolve, reject) => {
    console.log(resolve);
    console.log(reject);
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
