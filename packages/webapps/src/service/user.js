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

const getUser = () => {
  const u = user.get()
  return { type: UserType.None, ... u }
}

const setUserType = (type) => {
  const u = getUser()
  u.type = type
  user.set(u)
}

export {
  UserType,
  getUser,
  setUserType
}
