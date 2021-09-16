const path = require("path")
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    client: './js/socket.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
	target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
       test: /\.(png|svg|jpg|gif)$/,
       use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./views/index.html",
      filename: "./index.html",
      excludeChunks: [ 'server' ]
		}),
		new CopyWebpackPlugin({
			patterns: [
      {
        from: path.resolve("node_modules/socket.io/client-dist/socket.io.js"),
        to: path.resolve(__dirname, "dist")
			},
			{
        from: path.resolve("node_modules/socket.io/client-dist/socket.io.js"),
        to: path.resolve(__dirname, "views/socket.io")
      }
		]
		})
  ]
}