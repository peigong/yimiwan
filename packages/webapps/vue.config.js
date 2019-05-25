const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const glob = require('glob')
const pages = {};

glob.sync('src/wx/pages/**/main.js').forEach((entry) => {
  let { groups: { filename } } = /^src\/(?<filename>[\w|\/]+)\/main.js$/.exec(entry)
  const key = filename.split('/').slice(1).join('-')
  pages[key] = {
    entry: entry,
    template: 'public/template-wx.html',
    filename: `${ filename }.html`
  }
});

const proxy = {
  target: 'http://localhost:7001'
};
const devServer = {
  proxy: {
    '/oauth2': proxy,
    '/wx-proxy': proxy,
    '/wx-api': proxy
  }
};

module.exports = {
  pages,
  devServer
}
