module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ModelSchema = new Schema({
    active: { type: Boolean, default: true },  //  生效状态
    position: { type: Number, default: 1e6  }, 

    sn: { type: String, default: '' },
    name: { type: String, default: '' },
    remark: { type: String, default: '' }, // 备注

    parent: {
      sn: { type: String, default: '' },
      name: { type: String, default: '' }
    } // 类别
  });
  return mongoose.model('Classification', ModelSchema);
}
