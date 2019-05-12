import axios from 'axios'

const proxyHandler = axios.create({
  baseURL: '/wx/proxy/'
})
proxyHandler.interceptors.response.use(res => res.data);
const proxy = {
  post: proxyHandler.post
}

const apiHandler = axios.create({
  baseURL: '/api/'
})
apiHandler.interceptors.response.use(res => {
  const data = res.data || {}
  const status = data.status || {}
  switch (+status.code) {
    case 0:
      return data.data
    case 101:
      // 用户未验证
      let url = encodeURI(window.location.href);
      window.location.href = `/wx/proxy/authorize?url=${ url }`
      break;
    default:
      throw new Error(status.message)
  }
});
const api = {
  get: (api, data = {}) => {
    return apiHandler.get(api, { params: data })
  },
  post: apiHandler.post
}

export {
  proxy,
  api
}
