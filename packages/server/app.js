const fs = require('fs');
const path = require('path');
const https = require('https');

//根据项目的路径导入生成的证书文件
const privateKey  = fs.readFileSync(path.join(__dirname, './certificate/private.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, './certificate/file.crt'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

class AppBootHook {
  constructor(app) {
    this.app = app;
  }
  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
    https.createServer(credentials, this.app.callback()).listen(443);
  }
}

module.exports = AppBootHook;
