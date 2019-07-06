import { api } from '@/x/util/axios'
import { Status } from '@/x/enums'

export const getMessageList = async function(params = {}){
  return await api.get('messages', params)
}
export const createMessage = async function(params){
  return await api.post('messages', params)
}
export const approve = async function(id){
  return await api.put(`messages/${ id }`, { status: Status.Approved})
}
export const reject = async function(id){
  return await api.put(`messages/${ id }`, { status: Status.Rejective})
}
