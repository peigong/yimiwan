const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const glob = require('glob')
const pages = {};

glob.sync('src/x/pages/**/main.js').forEach((entry) => {
  let { groups: { filename } } = /^src\/(?<filename>[\w|\/|\-]+)\/main.js$/.exec(entry)
  const key = filename.split('/').slice(1).join('-')
  pages[key] = {
    entry: entry,
    template: 'public/template-x.html',
    filename: `${ filename }.html`
  }
})

const proxy = {
  target: 'http://localhost:7001'
};
const devServer = {
  proxy: {
    '/x': proxy,
    '/x-api': proxy
  }
}

module.exports = {
  pages,
  devServer
}
