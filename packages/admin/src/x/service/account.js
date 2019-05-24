import { api } from '@/x/util/axios'

export const getAccountInfo = async function(id){
  return await api.get(`accounts/${ id }`)
}

export const updateAccountInfo = async function(id, username, password){
  return await api.put(`accounts/${ id }`, { username, password })
}
