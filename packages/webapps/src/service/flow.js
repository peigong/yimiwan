import { api } from '@/util/axios'

const FlowType = {
  Job: '1',
  Applicant: '2'
}

export const getJobs = async function(){
  return await api.get('flow', { params: { type: FlowType.Job }  })
}

export const getApplicants = async function(){
  return await api.get('flow', { params: { type: FlowType.Applicant }  })
}
