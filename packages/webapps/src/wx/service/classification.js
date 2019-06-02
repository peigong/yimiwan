import { api } from '@/wx/util/axios'

export const getClassificationList = async function(sn){
  return await api.get(`classifications/${ sn }`)
}
