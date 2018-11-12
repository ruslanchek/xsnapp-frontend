const path = require('path');
const webpack = require('webpack');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let plugins = [
	new CleanWebpackPlugin(['dist'], {
		verbose: true,
	}),
	new HandlebarsPlugin({
		entry: path.join(process.cwd(), 'src/app/hbs', '*.hbs'),
		output: path.join(process.cwd(), 'dist', '[name].html'),
		data: {
			publicPath: ''
		},
	}),
];

module.exports = {
	entry: {
		app: './src/app/ts/app.ts'
	},

	output: {
		filename: '[name].js',
		publicPath: './',
		path: __dirname + '/dist',
	},

	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				extractComments: true,
				uglifyOptions: {
					warnings: false,
					parse: {},
					compress: {},
					mangle: true,
					output: null,
					toplevel: false,
					nameCache: null,
					ie8: false,
					keep_fnames: false,
					drop_console: true,
				}
			}),
		],
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
		plugins: [new TsConfigPathsPlugin()],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loaders: ['awesome-typescript-loader'],
				include: [
					path.resolve(__dirname, 'src/app/ts'),
				],
			},

			{
				test: /\.glsl$/,
				loader: 'webpack-glsl-loader',
			},

			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},

			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				loaders: ['file-loader'],
			},
		],
	},

	plugins,
};
