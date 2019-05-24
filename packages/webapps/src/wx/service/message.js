import { api } from '@/wx/util/axios'

export const getMessageList = async function(){
  return await api.get('message')
}
