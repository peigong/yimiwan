const ClassificationType = {
  'CompanyLogo': 'company-logo',
  'CompanyLicence': 'company-licence',
  'CompanyVideo': 'company-video'
}

const MediaType = {
  'None': 0,
  'Image': 1,
  'Video': 2,
  'TxVideo': 3
};

const JobType = {
  'None': 0,
  'Company': 1, // 公司JD
  'Intent': 2, // 招聘意向
  'Applicant': 3 // 求职意向
};

const MessageType = {
  'None': 0,
  'ToMessage': 1, // 回复消息
  'ToJob': 2, // 对岗位，公司收看
  'ToJobIntent': 3, // 对岗位意向，系统管理员收看
  'ToCompany': 4, // 对公司，公司收看
  'ToCompanyIntent': 5, // 对公司意向，系统管理员收看
  'ToApplicant': 6, // 对求职者
  'ToApplicantIntent': 7 // 对求职者意向
}

const Refer = {
  'None': '',
  'Job': 'job',
  'Company': 'company',
  'Intent': 'company',
  'Applicant': 'applicant'
};

const Status = {
  'None': 0,
  'Unaudited': 1,
  'Approved': 2,
  'Rejective': 3
};

module.exports = {
  ClassificationType,
  MediaType,
  JobType,
  MessageType,
  Refer,
  Status
};
