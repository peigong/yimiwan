import { api } from '@/util/axios'

export const getClassificationList = async function(){
  return await api.get('classification')
}
