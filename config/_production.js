const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const cssnano = require('cssnano')
const path = require('path')
// const fs = require('fs-extra')
const debug = require('debug')('app:webpack:production')

debug('================   production mode   ================')

const config = {
  context: path.join(__dirname, '../src'),

  entry: {
    qbui: './app.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: { 
            presets: ["es2015"]
          }
        }] 
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      },
      { 
        test: /\.(png|jpg|gif)$/,    
        loader: 'url?limit=1024&name=images/[path][name].[ext]' 
      }  
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'qbui.min.css'
    }),
    // new OptimizeCSSAssetsPlugin({
    //   assetNameRegExp: /\.min\.css$/,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorOptions: { discardComments: {removeAll: true } },
    //   canPrint: true
    // }),
    new webpack.optimize.UglifyJsPlugin({
      test: /\.min\.js$/,
      beautify: true,
      comments: false,
      sourceMap: true,
      compress: {
        warnings: false,
        drop_console: false,
        collapse_vars: true,
        reduce_vars: true,
      }
    }) 
    // new webpack.SourceMapDevToolPlugin({
    //   test: /\.min\.js$/
    // })

    
  ]
  // ,watch: true
}
// debug(webpack.optimize)


// config.plugins.push(
//   new CopyWebpackPlugin([{
//     from: 'index.html',
//     to: '../dist'
//   }])
// )
  
// webpack([webpackConfig], (err, state) => {
//   debug('webpack compile end')
//   fs.remove(path.join(__dirname, '/dist/qbui.css.map'), err => {
//     if (err) return debug(err)
//     debug('unused map file removed success!')
//   })
//   fs.remove(path.join(__dirname, '/dist/qbui.min.css.map'), err => {
//     if (err) return debug(err)
//     debug('unused map file removed success!')
//   })
//   fs.remove(path.join(__dirname, '/dist/qbui.js.map'), err => {
//     if (err) return debug(err)
//     debug('unused map file removed success!')
//   })
// })
module.exports = config