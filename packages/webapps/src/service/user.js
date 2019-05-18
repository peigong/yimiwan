import { api } from '@/util/axios'
import { create } from '@/util/storage'

const user = create('wx-user')

const UserType = {
  /**
  * 未定义
  */
  None: 0,

  /**
  * 求职者
  */
  Applicant: 1,

  /**
  * 招聘者
  */
  Recruiter: 2,

  /**
  * 猎头
  */
  Headhunter: 4,

  /**
  * 管理者
  */
  Administrator: 8
}

const getUser = async function(){
  let u = user.get()
  if(u){
    return Promise.resolve({ type: UserType.None, ... u })
  }else{
    u = await api.get('user-info')
    u = { type: UserType.None, ... u }
    user.set(u)
    return u
  }
}

const setUserType = async function(type){
  const u = await getUser()
  u.type = type
  return api.put('user-type', { type }).then(() => user.set(u))
}

export {
  UserType,
  getUser,
  setUserType
}
