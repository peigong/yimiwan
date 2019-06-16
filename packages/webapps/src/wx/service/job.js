import { api } from '@/wx/util/axios'

export const Type = {
  'None': 0,
  'Company': 1, // 公司JD
  'Intent': 2, // 招聘意向
  'Applicant': 3 // 求职意向
}
export const Refer = {
  'None': '',
  'Company': 'company',
  'Intent': 'company',
  'Applicant': 'applicant'
}

export const getJobList = async function(params){
  return await api.get('job', params)
}
export const getJobDetails = async function(id){
  return await api.get(`job/${ id }`)
}

export const createJob = async function(params){
  return await api.post('job', params)
}

export const updateJob = async function(params){
  return await api.put(`job/${ params.id }`, params)
}
