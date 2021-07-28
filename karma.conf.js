// karma.conf.js

var webpackConfig = require('./build/webpack.test.config')
module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: ['test/**/*.spec.js'],

    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    reporters: ['spec', 'coverage'],

    // browsers: ['Chrome'], 
    browsers: ['ChromeHeadless'], 

    coverageReporter: {
      dir: './coverage',
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }]
    }
  })
}