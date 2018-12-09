const path = require('path');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

let plugins = [
	new CleanWebpackPlugin(['dist'], {
		verbose: true,
	}),
	new HandlebarsPlugin({
		entry: path.join(process.cwd(), 'src/app/hbs', '*.hbs'),
		output: path.join(process.cwd(), 'dist', '[name].html'),
		data: {
			publicPath: '',
		},
	}),
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
		minimizer: [new TerserPlugin()],
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
				loaders: [
					{
						loader: 'awesome-typescript-loader',
						options: {
							useCache: false,
						},
					},
				],
				exclude: [/node_modules/],
				include: [path.resolve(__dirname, 'src/app/ts')],
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
				test: /\.(gif|png|jpe?g|mp4|mov)$/i,
				loaders: ['file-loader'],
			},
		],
	},

	plugins,
};
