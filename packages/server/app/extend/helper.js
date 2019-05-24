const crypto = require('crypto');

module.exports = {
  encrypt(secret){
    return crypto.createHmac('sha256', secret).update('yimiwan@2019').digest('hex');
  }
};
