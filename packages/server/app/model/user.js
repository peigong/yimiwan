module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    type: { type: Number, default: 0  },
    openId: { type: String, default: '' },
    cookieId: { type: String, default: ''  },
  });

  return mongoose.model('User', UserSchema);
}
