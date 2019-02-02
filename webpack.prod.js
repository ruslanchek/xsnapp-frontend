const path = require('path');
const webpack = require('webpack');
const packageData = require('./package');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

let plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		},
		__BASE_DOMAIN__: JSON.stringify(process.env.BASE_DOMAIN),
		__API_BASE_URL__: JSON.stringify(process.env.API_BASE_URL),
	}),
	new CleanWebpackPlugin(['dist'], {
		verbose: true,
	}),
	new HandlebarsPlugin({
		entry: path.join(process.cwd(), 'src/app/hbs', '*.hbs'),
		output: path.join(process.cwd(), 'dist', '[name].html'),
		data: {
			publicPath: '',
			version: packageData.version,
		},
	}),
	new CopyWebpackPlugin(
		[
			{
				from: 'src/assets',
				to: __dirname + '/dist',
			},
		],
		{
			debug: false,
			copyUnmodified: false,
		},
	),
];

module.exports = {
	entry: {
		app: './src/app/ts/app.ts',
	},

	output: {
		filename: '[name].js',
		publicPath: './',
		path: __dirname + '/dist',
	},

	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
		splitChunks: {
			chunks: 'all',
		},
	},

	mode: 'production',

	resolve: {
		unsafeCache: true,
		extensions: ['.webpack.js', '.ts', '.tsx', '.js'],
		modules: [
			'node_modules',
			__dirname + '/src/chart/ts',
			__dirname + '/src/app/ts',
		],
		plugins: [new TsconfigPathsPlugin({})],
	},

	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'ts-loader' },

			{
				test: /\.svg?$/,
				use: [
					{
						loader: 'react-svg-loader',
						query: {
							svgo: {
								pretty: true,
								plugins: [
									{
										removeStyleElement: true,
									},
									{
										removeTitle: true,
									},
								],
							},
						},
					},
				],
				include: [path.resolve(__dirname, 'src/app/img/svg-icons')],
			},

			{
				test: /\.(gif|png|jpe?g|mp4|mov|svg)$/i,
				loaders: ['file-loader'],
				exclude: [path.resolve(__dirname, 'src/app/img/svg-icons')],
			},
		],
	},

	plugins,
};
