const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');


console.log("generating frontend development ...");

module.exports = {
	entry: {
		server: "./index.js"
	},
  //Where files should be sent once they are bundled
  output: {
    path: path.join(__dirname, '/dist'),
		filename: '[name].js',
		publicPath: '/'
	},
	target: 'node',
	node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
	},
	externals: [nodeExternals()], // Need this to avoid error when
	resolve: {
    extensions: ['.js', '.jsx'],
  },
  //webpack 5 comes with devServer which loads in development mode
  //devServer: {
  //  port: 3000,
	//	watchContentBase: true,
	//	historyApiFallback: true,
	//},

  //Rules of how webpack will take our files, complie & bundle them for the browser
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
			},
      {
				test: /\.html$/,
				exclude: [/node_modules/, require.resolve('./views/index.html')],
        use: [
          {
						loader: "html-loader"
					},

        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
		new HtmlWebpackPlugin({
			template: './views/index.html',
			filename: "./index.html",
			excludeChunks: ["server"] }),
		new MiniCssExtractPlugin()],
}