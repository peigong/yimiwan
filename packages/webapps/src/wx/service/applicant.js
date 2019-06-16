import { api } from '@/wx/util/axios'

export const getApplicantList = async function(){
  return await api.get('applicant')
}
export const getApplicantDetails = async function(){
  return await api.get('applicant')
}
export const updateApplicant = async function(params){
  return await api.post('applicant', params)
}
