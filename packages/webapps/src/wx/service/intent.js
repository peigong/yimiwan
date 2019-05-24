import { api } from '@/wx/util/axios'

export const getIntentList = async function(){
  return await api.get('intent')
}
