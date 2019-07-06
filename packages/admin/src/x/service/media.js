import { api } from '@/x/util/axios'
import { Status } from '@/x/enums'

export const getMediaUrl = function(media = {}){
  let url = media.url || ''
  if(url){
    url = `/media/${ url }`
  }
  return url
}

export const getMediaList = async function(params = {}){
  return await api.get('media', params)
}
export const getMediaDetails = async function(id){
  return await api.get(`media/${ id }`)
}
export const createMedia = async function(params){
  return await api.post('media', params)
}
export const approve = async function(id){
  return await api.put(`media/${ id }`, { status: Status.Approved})
}
export const reject = async function(id){
  return await api.put(`media/${ id }`, { status: Status.Rejective})
}
