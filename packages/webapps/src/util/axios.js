import axios from 'axios'
import { baseURL } from '@/conf/wx'

const conf = {
  transformResponse: [function (res) {
    return res.data;
  }]
}
export const proxy = axios.create(Object.assign({
  baseURL: `${ baseURL }/wx/proxy/`
}, conf))

export const api = axios.create(Object.assign({
  baseURL: `${ baseURL }/api/`
}, conf))
