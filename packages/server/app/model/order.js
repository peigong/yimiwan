module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ModelSchema = new Schema({
    openid: { type: String, default: '' }, //	用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
    unionid: { type: String, default: '' }, //	只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。

    active: { type: Boolean, default: true },
    del: { type: Boolean, default: false },  //  删除标记
    createTime: { type: Date, default: Date.now() },
    updateTime: { type: Date, default: Date.now() },

    title: { type: String, default: '' }
  });
  return mongoose.model('Order', ModelSchema);
}
