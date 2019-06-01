import { api } from '@/x/util/axios'

export const Type = {
  'None': 0,
  'Image': 1,
  'Video': 2,
  'TxVideo': 3
}
export const Status = {
  'None': 0,
  'Unaudited': 1,
  'Approved': 2,
  'Rejective': 3
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
