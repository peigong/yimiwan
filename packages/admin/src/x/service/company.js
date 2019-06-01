import { api } from '@/x/util/axios'

export const Status = {
  'None': 0,
  'Unaudited': 1,
  'Approved': 2,
  'Rejective': 3
}

export const getCompanyList = async function(params = {}){
  return await api.get('companies', params)
}
export const getCompanyDetails = async function(id){
  return await api.get(`companies/${ id }`)
}

export const approve = async function(id){
  return await api.put(`companies/${ id }`, { status: Status.Approved})
}
export const reject = async function(id){
  return await api.put(`companies/${ id }`, { status: Status.Rejective})
}
