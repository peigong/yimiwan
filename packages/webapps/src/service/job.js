import { api } from '@/util/axios'

export const getJobList = async function(){
  return await api.get('job')
}
