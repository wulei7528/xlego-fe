const { override, fixBabelImports, addLessLoader } = require('customize-cra')

const config = override(
  addLessLoader(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css', // change importing css to less
  })
)

module.exports = config
