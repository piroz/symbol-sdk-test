const WorkerPlugin = require('worker-plugin');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/symbol-sdk-test/',
  outputDir: 'docs',
  configureWebpack: {
    plugins: [
      new WorkerPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          }
        }
      ]
    }
  }
}
