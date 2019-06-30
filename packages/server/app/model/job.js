module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ModelSchema = new Schema({
    openid: { type: String, default: '' }, //	用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
    unionid: { type: String, default: '' }, //	只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。

    active: { type: Boolean, default: true },  //  生效状态
    del: { type: Boolean, default: false },  //  删除标记
    status: { type: Number, default: 1  }, // 类型，值为1时是待审核，值为2时是已审核，值为3时是已驳回

    type: { type: Number, default: 0  }, // JD类型，值为1时是公司JD，值为2时是招聘意向，值为3时是求职意向，值为0时是未知
    topical: {
      company: {
        type : mongoose.Schema.ObjectId,
        ref : 'Company'
      },
      applicant: {
        type : mongoose.Schema.ObjectId,
        ref : 'Applicant'
      }
    }, // 关联ID，公司ID，个人ID
    refer: { type: String, default: '' }, // 参考辅助ID

    title: { type: String, default: '' }, // 岗位名称
    payment: { type: String, default: '' }, // 福利待遇
    workhours: { type: String, default: '' }, // 工作时间
    workaddress: { type: String, default: '' }, // 工作地址
    remark: { type: String, default: '' }, // 备注说明

    jobcontent: { type: String, default: '' }, // 工作内容
    requirement : { type: String, default: '' }, // 工作要求

    classification: {
      sn: { type: String, default: '' },
      name: { type: String, default: '' }
    } // 类别
  });
  return mongoose.model('Job', ModelSchema);
}
