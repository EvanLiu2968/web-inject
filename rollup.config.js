const { uglify } = require('rollup-plugin-uglify')

const config = {
  input: 'src/index.js',
  plugins: [
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
  output: [
    // {
    //   format: 'cjs',
    //   file: 'lib/web-inject.js'
    // },
    {
      format: 'umd',
      name: 'webInject',
      // sourcemap: true,
      strict: true,
      file: 'lib/web-inject.min.js'
    }
  ]
}

export default config
