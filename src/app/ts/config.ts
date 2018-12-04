export const PATHS = {
	HOME: '/',
	ITEM: '/item/:itemId',
	AUTH_LOGIN: '/auth/login',
	UPLOAD: '/upload',
	NOT_FOUND: '/404',
};

export const API_PATHS = {
	GET_ITEMS: '/items',
	GET_ITEM: '/item/:itemId',
	GET_PROFILE: '/profile',
	AUTH_LOGIN: '/auth/login',
	AUTH_REGISTER: '/auth/register',
	UPLOAD: '/upload',
	GET_COMMENTS: '/comments/:itemId',
	ADD_COMMENT: '/comments',
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
				domain: '.mbrtn.local',
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

// s3
export const S3_ACCESS_KEY_ID: string = 'AKIAIKPY3VXKBMXW7BBQ';
export const S3_SECRET_ACCESS_KEY: string =
	'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';
export const S3_BUCKET: string = 'ppp-coder';
export const PUBLIC_DIR: string = 'content';
