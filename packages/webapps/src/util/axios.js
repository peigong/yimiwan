import axios from 'axios'
import { baseURL } from '@/conf/wx'

const proxyHandler = axios.create({
  baseURL: `${ baseURL }/wx/proxy/`
})
proxyHandler.interceptors.response.use(res => res.data);
const proxy = {
  post: proxyHandler.post
}

const apiHandler = axios.create({
  baseURL: `${ baseURL }/api/`
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
