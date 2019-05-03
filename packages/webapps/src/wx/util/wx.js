import { proxy } from '@/util/axios'
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

let ready = false
const timeouts = 5 // 超时设定，秒
const commands = [] // 命令队列

const jsApis = new Map()
jsApiList.forEach(key => {
  jsApis.set(key, false)
})

function syncExec(args){
  const { command, options, resolve, reject } = args
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
}
function asyncExec(command, options){
  return new Promise((resolve, reject) => {
    syncExec({ command, options, resolve, reject })
  })
}

function create(command){
  return function(options){
    return new  Promise((resolve, reject) => {
      const arg = { command, options, resolve, reject }
      if(ready){
        if(jsApis.get(command)){
          syncExec(arg)
        }else{
          reject(new Error(`${ command } no permission.`))
        }
      }else{
        commands.push(arg)
      }
    })
  }
}

async function awaitReady(){
  return new  Promise((resolve, reject) => {
    if(wx){
      proxy.post('config', { url: url })
      .then(config => {
        wx.config(Object.assign({}, { debug, jsApiList }, config));
        wx.ready(async () =>  {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          const res = await asyncExec('checkJsApi', { jsApiList })
          const checkResult = res.checkResult
          Object.keys(checkResult).forEach(key => {
            jsApis.set(key, !!checkResult[key])
          })
          ready = true
          resolve(jsApis)
        });
        wx.error(reject)
      })
      .catch(reject)

      let counter = 0 // 计数器
      let timer = setInterval(() => {
        counter++
        if(counter > timeouts * 1e3){
          clearInterval(timer)
          timer = null
          counter = 0
          if(!ready){
            reject(new Error('wx timeout.'))
          }
        }
      }, 1)
    }else{
      reject(new Error('wx undefined.'))
    }
  })
}

awaitReady()
.then((jsApis) => {
  let command = commands.pop()
  while(command){
    if(jsApis.get(command.command)){
      syncExec(command)
    }else{
      command.reject(new Error(`${ command.command } no permission.`))
    }
    command = commands.pop()
  }
})
.catch(err => console.log(err.message))

export const chooseImage = create('chooseImage')
export const getNetworkType = create('getNetworkType')
export const getLocation = create('getLocation')
export const geoLocation = create('geoLocation')
