import { api } from '@/wx/util/axios'

export const getMessageList = async function(){
  return await api.get('message')
}

export const getRepliedMessages = async function(id){
  return await api.get(`message/${ id }`)
}

export const createMessage = async function(params){
  return await api.post('message', params)
}
