import { api } from '@/x/util/axios'

export const Status = {
  'None': 0,
  'Unaudited': 1,
  'Approved': 2,
  'Rejective': 3
}

export const getJobList = async function(params = {}){
  return await api.get('job', params)
}
export const getJobDetails = async function(id){
  return await api.get(`job/${ id }`)
}
export const createJob = async function(params){
  return await api.post('job', params)
}
export const approve = async function(id){
  return await api.put(`job/${ id }`, { status: Status.Approved})
}
export const reject = async function(id){
  return await api.put(`job/${ id }`, { status: Status.Rejective})
}
