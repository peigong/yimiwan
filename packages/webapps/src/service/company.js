import { api } from '@/util/axios'

export const getCompanyList = async function(){
  return await api.get('company')
}
