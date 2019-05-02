import { api } from '@/util/axios'

export const getList = async function(){
  return await api.get('classification')
}
