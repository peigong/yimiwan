import axios from 'axios'
import { baseURL } from '@/conf/wx'

const proxy = axios.create({
  baseURL: `${ baseURL }/wx/proxy/`
})
proxy.interceptors.response.use(res => res.data);

const api = axios.create({
  baseURL: `${ baseURL }/api/`
})
api.interceptors.response.use(res => res.data);

export {
  proxy,
  api
}
