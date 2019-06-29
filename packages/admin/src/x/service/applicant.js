import { api } from '@/x/util/axios'
import { Status } from '@/x/enums'

export const getApplicantList = async function(params = {}){
  return await api.get('applicant', params)
}
export const getApplicantDetails = async function(id){
  return await api.get(`applicant/${ id }`)
}
export const createApplicant = async function(params){
  return await api.post('applicant', params)
}
export const approve = async function(id){
  return await api.put(`applicant/${ id }`, { status: Status.Approved})
}
export const reject = async function(id){
  return await api.put(`applicant/${ id }`, { status: Status.Rejective})
}
