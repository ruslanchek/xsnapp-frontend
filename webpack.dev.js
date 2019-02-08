const path = require('path');
const packageData = require('./package');
const webpack = require('webpack');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;
const port = process.env.PORT || 7000;
const host = '0.0.0.0';

let plugins = [
	// new BundleAnalyzerPlugin(),
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
	new webpack.NamedModulesPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new HandlebarsPlugin({
		entry: path.join(process.cwd(), 'src/app/hbs', '*.hbs'),
		output: path.join(process.cwd(), 'dist', '[name].html'),
		data: {
			publicPath: '/',
			version: packageData.version,
		},
	}),
];

module.exports = {
	cache: true,

	entry: {
		app: [
			'webpack-dev-server/client?http://' + host + ':' + port,
			'webpack/hot/only-dev-server',
			'./src/app/ts/app.ts',
		],
	},

	output: {
		filename: '[name].js',
		publicPath: '/',
		path: __dirname + '/dist',
	},

	watch: true,

	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
		ignored: ['dist', 'node_modules'],
	},

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: false,
		index: 'index.html',
		disableHostCheck: true,
		hot: true,
		stats: true,
		historyApiFallback: {
			index: '/index.html',
		},
		overlay: {
			warnings: true,
			errors: true,
		},
		host: host,
		port: port,
		watchOptions: {
			poll: true,
		},
	},

	devtool: 'source-map',

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
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
				exclude: [/node_modules/, /build/, /__test__/],
			},

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

	plugins: plugins,
};
