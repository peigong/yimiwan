module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ModelSchema = new Schema({
    // 发信人ID
    openid: { type: String, default: '' }, //	用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
    unionid: { type: String, default: '' }, //	只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。

    active: { type: Boolean, default: true },
    del: { type: Boolean, default: false },  //  删除标记
    status: { type: Number, default: 1  }, // 类型，值为1时是待审核，值为2时是已审核，值为3时是已驳回

    to: { type: String, default: '' }, //	收信人ID
    type: { type: Number, default: 0  }, // 信息的类型，对人，对简历，对公司，信息回复
    topical: { type: String, default: '' }, // 讨论的主题ID
    refer: { type: String, default: '' }, // 参考辅助ID

    createTime: { type: Date, default: Date.now() },
    updateTime: { type: Date, default: Date.now() },

    title: { type: String, default: '' }, // 信息主题
    content: { type: String, default: '' }, // 信息内容
  });
  return mongoose.model('Message', ModelSchema);
}
