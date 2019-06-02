import { api } from '@/wx/util/axios'

export const getCompanyList = async function(){
  return await api.get('companies')
}
export const getCompanyDetails = async function(id){
  return await api.get(`companies/${ id }`)
}

export const createCompany = async function(params){
  return await api.post('companies', params)
}

export const updateCompany = async function(params){
  return await api.put(`companies/${ params.id }`, params)
}
