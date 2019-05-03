import { api } from '@/util/axios'

export const getCVList = async function(){
  return await api.get('cv')
}
