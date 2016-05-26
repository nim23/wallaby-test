'use strict'
let wallabify = require('wallabify')
let babel = require('babel')
let wallabyPostProcessor = wallabify({})

module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false},
      {pattern: 'src/utils/karma.polyfill.js', instrument: false},
      {pattern: 'src/**/*.json', instrument: false, load: false},
      {pattern: 'src/**/*.js*', load: false},
      {pattern: 'src/**/*.spec.js', ignore: true}
    ],

    tests: [
      {pattern: 'src/**/*.spec.js', load: false}
    ],

    postprocessor: wallabyPostProcessor,

    setup: function () {
      // required to trigger tests loading
      window.__moduleBundler.loadTests()
    },

    compilers: {
      'src/**/*.js*': wallaby.compilers.babel({
        stage: 2
      })
    },

    debug: true
  }
}