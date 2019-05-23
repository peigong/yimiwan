const crypto = require('crypto');

module.exports = {
  pack(data){
    return {
      status: {
        code: 0,
        message: 'ok'
      },
      data: data
    };
  },

  packError(code, message){
    return {
      status: {
        code: code,
        message: message
      },
      data: {}
    };
  },

  encrypt(secret){
    return crypto.createHmac('sha256', secret).update('yimiwan@2019').digest('hex');
  }
};
