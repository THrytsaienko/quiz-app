const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname, './src'),
	watch: true,
	entry: {
		app: [
			'babel-polyfill',
			'./js/app.js',
		]
	},
	output: {
		path: path.resolve(__dirname, './docs/assets'),
		filename: '[name].bundle.js',
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['env', 'stage-0']
			}
		}]
	},
	devServer: {
		contentBase: path.join(__dirname, "./docs"),
		compress: true,
		port: 9000
	}
};