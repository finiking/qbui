const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const debug = require('debug')('app:webpack:development')

debug('================   development   =================')

const config = {
  context: path.join(__dirname, '../src'),

  entry: {
    qbui: './app.js'
  },
  // devServer: {
  //   // contentBase: path.join(__dirname, '/build')
  //   contentBase: false
  // },
 
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    // publicPath: path.join(__dirname, '../build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: { presets: ["es2015"] }
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
                minimize: false,
                sourceMap: false,
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
      filename: 'qbui.css'
    }),

    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
  // ,watch: true
}
// debug(webpack.optimize)


module.exports = config