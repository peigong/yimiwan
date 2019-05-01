const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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

const scssLoaders = [
  // 'style-loader',
  MiniCssExtractPlugin.loader,
  { loader: 'css-loader' },
  {
    loader: 'postcss-loader',
    options: { sourceMap: true },
  },
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
    },
  },
]

const configureWebpack = {
  resolve: {
    symlinks: false
  }
  /*
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: scssLoaders
      }
    ]
  }*/
}

module.exports = {
  pages,
  configureWebpack
}
