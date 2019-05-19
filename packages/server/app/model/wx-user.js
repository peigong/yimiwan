module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const WxUserSchema = new Schema({
    type: { type: Number, default: 0  },

    openid: { type: String, default: '' }, //	用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
    unionid: { type: String, default: '' }, //	只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。

    nickname: { type: String, default: '' }, //	用户昵称
    sex: { type: Number, default: 0  }, //	用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
    province: { type: String, default: '' }, //	用户个人资料填写的省份
    city: { type: String, default: '' }, //	普通用户个人资料填写的城市
    country: { type: String, default: '' }, //	国家，如中国为CN
    headimgurl: { type: String, default: '' }, //	用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
    privilege: { type: Array, default: [] }, //	用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）

    access_token: { type: String, default: '' }, //	网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
    expires_in: { type: Number, default: 0  }, //	access_token接口调用凭证超时时间，单位（秒）
    refresh_token: { type: String, default: '' }, //	用户刷新access_token
    scope: { type: String, default: '' }, //	用户授权的作用域，使用逗号（,）分隔
    timestamp: { type: Number, default: 0  }
  });
  return mongoose.model('WxUser', WxUserSchema);
}
