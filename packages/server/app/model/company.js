module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ModelSchema = new Schema({
    openid: { type: String, default: '' }, //	用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
    unionid: { type: String, default: '' }, //	只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。

    active: { type: Boolean, default: false },  //  生效状态

    title: { type: String, default: '' }, // 工商注册的全称
    licence: {// 营业执照
      mediaid: { type: String, default: '' },
      url: { type: String, default: '' }
    },
    summary: { type: String, default: '' }, // 公司业务简介
    adress: { type: String, default: '' }, // 公司地址
    phone: { type: String, default: '' }, // 联系电话
    email: { type: String, default: '' }, // 电子邮箱
    linkman: { type: String, default: '' }, // 负责人

    classification: {
      sn: { type: String, default: '' },
      name: { type: String, default: '' }
    } // 行业分类
  });
  return mongoose.model('Company', ModelSchema);
}
