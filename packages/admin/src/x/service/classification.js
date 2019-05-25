import { api } from '@/x/util/axios'

export const getClassificationList = async function(){
  return await api.get('classifications')
}

export const createClassification = async function(sn, name, active){
  return await api.post('classifications', { sn, name, active })
}

export const updateClassification = async function(id, sn, name, active){
  return await api.put(`classifications/${ id }`, { sn, name, active })
}
