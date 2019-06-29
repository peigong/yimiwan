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

/**
* 获取微信账号关联的公司信息
*/
export const getMyCompany = async function(){
  return await api.get('my-company')
}
/**
* 更新微信账号关联的公司信息
*/
export const updateMyCompany = async function(params){
  return await api.put('my-company', params)
}
