var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'main.js'
	},
	module: {
		rules: [
			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
    	]
  	},
	plugins : [
		new UglifyJSPlugin()
	]
}