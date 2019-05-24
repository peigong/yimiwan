import { api } from '@/wx/util/axios'

export const getCVList = async function(){
  return await api.get('cv')
}
