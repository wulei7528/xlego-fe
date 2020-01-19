const { override, fixBabelImports, addLessLoader, addWebpackPlugin, addBabelPlugin } = require('customize-cra')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const config = override(
  addLessLoader(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css', // change importing css to less
  }),
  addWebpackPlugin(
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
    })
  ),
  addWebpackPlugin(new LodashModuleReplacementPlugin({ paths: true })),
  addWebpackPlugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)),
  addBabelPlugin(['lodash']),
  // used to minimise bundle size by 500KB
  function(config, env) {
    const alias = config.resolve.alias || {}
    alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './src/icons.js')
    config.resolve.alias = alias
    return config
  }
)

module.exports = config
