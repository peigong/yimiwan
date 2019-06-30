import { api } from '@/wx/util/axios'

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

export const getMyCompanyJob = async function(params){
  return await api.get('my-company-job', params)
}
