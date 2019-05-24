import { api } from '@/wx/util/axios'

export const getApplicantList = async function(){
  return await api.get('applicant')
}
