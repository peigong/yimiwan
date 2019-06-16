module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ModelSchema = new Schema({
    openid: { type: String, default: '' }, //	用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
    unionid: { type: String, default: '' }, //	只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。

    active: { type: Boolean, default: true },
    del: { type: Boolean, default: false },  //  删除标记
    status: { type: Number, default: 1  }, // 类型，值为1时是待审核，值为2时是已审核，值为3时是已驳回

    topical: { type: String, default: '' }, // 主题ID
    refer: { type: String, default: '' }, // 参考辅助ID

    type: { type: Number, default: 0  }, // 类型，值为1时是图片，值为2时是视频，值为3时是腾讯视频，值为0时是未知
    mediaid: { type: String, default: '' },
    summary: { type: String, default: '' }, // 摘要
    url: { type: String, default: '' }, //

    classification: {
      sn: { type: String, default: '' },
      name: { type: String, default: '' }
    } // 类别
  });
  return mongoose.model('Media', ModelSchema);
}
