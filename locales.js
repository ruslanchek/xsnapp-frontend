const locales = require('./locales.json');
const lokaliseApi = require('lokalise-api');
const prompt = require('select-prompt');
const process = require('process');

const TOKEN = 'c0608975ac1456768405a6422d74ece20088ce35';
const PROJECT_ID = '788743025c3b176cccda93.78784858';

const lokalise = new lokaliseApi.LokaliseAPI(TOKEN);

let exportLocalesToLokalise = async () => {
	console.log('\x1b[33m%s\x1b[0m', 'Exporting data to lokalise');

	for (const locale of locales) {
		let data = await lokalise.projects.import({
			id: PROJECT_ID,
			file: __dirname + '/src/app/locales/' + locale.locale + '.json',
			lang_iso: locale.locale,
			icu_plurals: 1,
			replace: 1,
		});

		if (data.response.code === '200') {
			console.log('\x1b[36m%s\x1b[0m', locale.locale, data.response.status);
			console.log(
				'SKIPPED:',
				data.result.skipped,
				'INSERTED:',
				data.result.inserted,
				'UPDATED: ',
				data.result.updated,
			);
		} else {
			console.log('\x1b[31m%s\x1b[0m', locale.locale, data.response.message);
		}
	}

	console.log('\x1b[36m%s\x1b[0m', 'Exporting data is finished');
};

let importLocales = () => {
	console.log('\x1b[33m%s\x1b[0m', 'Import data from lokalise');

	lokalise.projects
		.exportToPath(__dirname + '/src/app', {
			id: PROJECT_ID,
			type: 'json',
			export_empty: 'base',
			json_unescaped_slashes: 1,
			plural_format: 'icu',
			placeholder_format: 'i18n',
			bundle_structure: 'locales/%LANG_ISO%.%FORMAT%',
		})
		.then(data => {
			if (data.response.code === '200') {
				console.log(
					'\x1b[36m%s\x1b[0m',
					'Importing Lokalise data is finished successfully',
				);
			} else {
				console.log(data.response.message);
			}
		});
};

const colors = [
	{ title: 'Download from lokalise', value: importLocales },
	{ title: 'Upload translations to lokalise', value: exportLocalesToLokalise },
];

if (process.env.DOWNLOAD || process.argv.indexOf('--download') >= 0) {
	importLocales();
} else if (process.env.UPLOAD) {
	exportLocalesToLokalise();
} else {
	prompt('Lokalise translations', colors, { cursor: 0 }).on('submit', func =>
		func(),
	);
}
