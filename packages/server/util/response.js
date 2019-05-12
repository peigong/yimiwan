function packData(data){
  return {
    status: {
      code: 0,
      message: 'ok'
    },
    data: data
  };
}

function packError(code, message){
  return {
    status: {
      code: code,
      message: message
    },
    data: {}
  };
}

module.exports = {
  packData,
  packError
};
