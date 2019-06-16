module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ModelSchema = new Schema({
    openid: { type: String, default: '' }, //	用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
    unionid: { type: String, default: '' }, //	只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。

    active: { type: Boolean, default: false },  //  生效状态
    del: { type: Boolean, default: false },  //  删除标记
    status: { type: Number, default: 1  }, // 类型，值为1时是待审核，值为2时是已审核，值为3时是已驳回

    title: { type: String, default: '' }, // 求职意向
    name: { type: String, default: '' }, // 姓名
    /*
    sex: { type: Number, default: 0  }, // 性别，值为1时是男性，值为2时是女性，值为0时是未知
    birthday: { type: String, default: '' }, // 出生日期
    adress: { type: String, default: '' }, // 家庭住址
    marital: { type: Number, default: 0  }, // 婚姻状况

    character: { type: String, default: '' }, // 性格类型
    honour: { type: String, default: '' }, // 所获荣誉
    interest: { type: String, default: '' }, // 兴趣特长
*/
    classification: {
      sn: { type: String, default: '' },
      name: { type: String, default: '' }
    } // 类别
  });
  return mongoose.model('Applicant', ModelSchema);
}
