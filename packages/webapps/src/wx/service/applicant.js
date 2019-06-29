import { api } from '@/wx/util/axios'

export const getApplicantList = async function(){
  return await api.get('applicant')
}

export const getDetails = async function(id){
  return await api.get(`applicant/${ id }`)
}

/**
* 获取微信账号关联的求职者信息
*/
export const getMyInfo = async function(){
  return await api.get('my-applicant-info')
}
/**
* 更新微信账号关联的求职者信息
*/
export const updateMyInfo = async function(params){
  return await api.put('my-applicant-info', params)
}
