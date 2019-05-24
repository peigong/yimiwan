import { api } from '@/wx/util/axios'

export const getCompanyList = async function(){
  return await api.get('company')
}
