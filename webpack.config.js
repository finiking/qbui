'use strict'

const debug = require('debug')('app:webpack')

const env = process.env.NODE_ENV

debug('webpack compile start')

const config = require(`./config/_${env}.js`)

const baseConfig = {
  devtool: ( env === 'production' ) ? 'source-map' : false,
  
}
const webpackConfig = Object.assign(baseConfig, config)

module.exports = webpackConfig