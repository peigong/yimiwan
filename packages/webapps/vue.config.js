
const glob = require('glob')
const pages = {};

glob.sync('src/pages/wx/*/*/main.js').forEach((entry) => {
  let { groups: { filename } } = /^src\/(?<filename>[\w|\/]+)\/main.js$/.exec(entry)
  const key = filename.split('/').slice(1).join('-')
  pages[key] = {
    entry: entry,
    template: 'public/template-wx.html',
    filename: `${ filename }.html`
  }
})

module.exports = {
  pages
}
