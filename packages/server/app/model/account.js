module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AccountSchema = new Schema({
    openid: { type: String, default: '' }, //	用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
    unionid: { type: String, default: '' }, //	只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。
    username: { type: String, default: '' },
    password: { type: String, default: '' }
  });
  return mongoose.model('Account', AccountSchema);
}
