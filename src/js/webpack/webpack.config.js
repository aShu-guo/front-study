const path = require('path');
console.log(__dirname)
module.exports = {
  mode: 'development',
  entry: {
    'main': './src/js/webpack/entry/main.js',
    'index': './src/js/webpack/entry/index.js',
    'index-text': './src/js/webpack/entry/index-text.js',
    'index-md': './src/js/webpack/entry/index-md.js',
    'file-entry':'./src/js/webpack/entry/file-entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        loader: "raw-loader"
      },
      {
        test: /\.md$/,
        use: [
          //从下往上加载
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader"
          }
        ]
      },
      {
        test: /\.png$/,
        loader: "file-loader"
      }
    ]
  }
}
