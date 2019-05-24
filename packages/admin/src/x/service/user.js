import { api } from '@/x/util/axios'

export const getUserList = async function(){
  return await api.get('users')
}
