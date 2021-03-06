import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
	entry: {
		index: path.join(__dirname, 'src', 'index.js'),
	},
	output: {
		path: path.join(__dirname, 'static/dist'),
		filename: '[name].bundle.js',
	},
	mode: process.env.NODE_ENV || 'development',
	resolve: {
		extensions: ['.jsx', '.js'],
		modules: [path.resolve(__dirname, 'static/js'), path.resolve(__dirname, 'src'), 'node_modules'],
	},
	module: {
		rules: [
			{
				// this is so that we can compile any React,
				// ES6 and above into normal ES5 syntax
				test: /\.(js|jsx)$/,
				// we do not want anything from node_modules to be compiled
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(css|scss)$/,
				use: [
					'style-loader', // creates style nodes from JS strings
					'css-loader', // translates CSS into CommonJS
					'sass-loader', // compiles Sass to CSS, using Node Sass by default
				],
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
				loaders: ['file-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			chunks: ['index'],
			template: path.join(__dirname, 'static', 'index.html'),
			filename: path.join(__dirname, 'static/dist', 'index.html'),
		}),
	],
	watch: false,
};