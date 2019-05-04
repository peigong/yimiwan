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
apiHandler.interceptors.response.use(res => res.data);
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
