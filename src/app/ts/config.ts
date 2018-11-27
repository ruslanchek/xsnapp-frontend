export const PATHS = {
	HOME: '/',
	ITEM: '/item/:id',
	AUTH_LOGIN: '/auth/login',
	UPLOAD: '/upload',
	NOT_FOUND: '/404',
};

export const API_PATHS = {
	GET_ITEMS: '/items',
	GET_ITEM: '/item/:id',
	GET_PROFILE: '/profile',
	AUTH_LOGIN: '/auth/login',
	AUTH_REGISTER: '/auth/register',
	UPLOAD: '/upload',
	GET_COMMENTS: '/comments',
};

export const CONFIG = {
	API_BASE_URL: 'http://mbrtn.local:3031/api',
	STATIC_PATH: 'https://d15hjmscxdyus1.cloudfront.net/static',
	CONTENT_PATH: 'https://d15hjmscxdyus1.cloudfront.net/content',
	AVATARS_PATH: 'https://d15hjmscxdyus1.cloudfront.net/avatars',
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
