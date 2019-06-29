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

const Refer = {
  'None': '',
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
  MediaType,
  JobType,
  Refer,
  Status
};
