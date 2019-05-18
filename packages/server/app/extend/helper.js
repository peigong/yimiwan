
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
  }
};
