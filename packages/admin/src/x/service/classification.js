import { api } from '@/x/util/axios'

export const getClassificationList = async function(){
  return await api.get('classifications')
}

export const createClassification = async function(params){
  return await api.post('classifications', params)
}

export const updateClassification = async function(params){
  return await api.put(`classifications/${ params.id }`, params)
}
