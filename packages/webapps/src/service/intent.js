import { api } from '@/util/axios'

export const getIntentList = async function(){
  return await api.get('intent')
}
