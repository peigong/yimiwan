import { api } from '@/util/axios'

export const getApplicantList = async function(){
  return await api.get('applicant')
}
