module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ModelSchema = new Schema({
    openid: { type: String, default: '' }, //	用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
    unionid: { type: String, default: '' }, //	只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。

    active: { type: Boolean, default: false },  //  生效状态
    cv: { type: String, default: '' }, // 简历的ID
    type: { type: Number, default: 0  }, // 简历经历，值为1时是教育经历，值为2时是工作经历，值为0时是未知

    title: { type: String, default: '' }, // 就读学校，工作单位
    major: { type: String, default: '' }, // 就读专业，主要工作
    graduate: { type: String, default: '' }, // 学历，职务
    from: { type: String, default: '' }, // 开始时间
    to: { type: String, default: '' }, // 结束时间
  });
  return mongoose.model('CVExperience', ModelSchema);
}
