export const PATHS = {
	HOME: '/',
	AUTH_LOG_IN: '/auth/log-in',
};

export const API_PATHS = {
	GET_ITEMS: '/items',
	GET_PROFILE: '/profile',
	AUTH_LOG_IN: '/auth/log-in',
};

export const CONFIG = {
	API_BASE_URL: 'http://localhost:3031/api',
	STATIC_PATH: 'https://d15hjmscxdyus1.cloudfront.net/static',
	CONTENT_PATH: 'https://d15hjmscxdyus1.cloudfront.net/content',
	STORAGE: {
		PREFIX: 'REALTHUB',
		COOKIES: {
			OPTIONS: {
				domain: '.realthub.com',
				path: '/',
				expires: new Date(
					new Date().setFullYear(new Date().getFullYear() + 10),
				),
			},
		},
	},
	REF_PARAMS: [],
	DEFAULT_LOCALE: 'en',
	LOCALE_SYNONYMS: {
		fil: ['tl'],
	},
	DEFAULT_API_VERSION: 12,
};
