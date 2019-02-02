declare global {
	const __API_BASE_URL__: string;
	const __BASE_DOMAIN__: string;
}

export const PATHS = {
	HOME: '/',
	SEARCH: '/search',
	TV: '/tv',
	CATEGORIES: '/categories',
	USER: '/user',
	ITEM: '/item/:itemId',
	SIGN_IN: '/auth/sign-in',
	SIGN_UP: '/auth/sign-up',
	PASSWORD_RESET: '/auth/password-reset',
	PASSWORD_RESET_CONFIRM: '/auth/password-reset-confirm',
	UPLOAD_GET_STARTED: '/upload',
	UPLOAD_DO_UPLOAD: '/upload/do-upload',
	USER_EDIT_ITEM: '/user/items/:itemId',
	USER_ITEMS: '/user/items',
	TERMS: '/terms',
	NOT_FOUND: '/404',
};

export const API_PATHS = {
	GET_ITEMS: '/items',
	GET_ITEM: '/items/:itemId',
	GET_PROFILE: '/profile',
	AUTH_LOGIN: '/auth/login',
	AUTH_REGISTER: '/auth/register',
	PASSWORD_RESET: '/auth/password-reset',
	PASSWORD_RESET_CONFIRM: '/auth/password-reset-confirm',
	UPLOAD: '/upload',
	GET_USER_ITEMS: '/user/items',
	GET_USER_ITEM: '/user/items/:itemId',
	GET_COMMENTS: '/comments/:itemId',
	ADD_COMMENT: '/comments',
};

export const CONFIG = {
	API_BASE_URL: __API_BASE_URL__,
	STATIC_PATH: 'https://static-xsnapp.ams3.cdn.digitaloceanspaces.com/static',
	CONTENT_PATH: 'https://static-xsnapp.ams3.cdn.digitaloceanspaces.com/content',
	AVATARS_PATH: 'https://static-xsnapp.ams3.cdn.digitaloceanspaces.com/avatars',
	STORAGE: {
		PREFIX: 'REALTHUB',
		COOKIES: {
			OPTIONS: {
				domain: `.${__BASE_DOMAIN__}`,
				path: '/',
				expires: new Date(
					new Date().setFullYear(new Date().getFullYear() + 10),
				),
			},
		},
	},
	REF_PARAMS: [],
	DEFAULT_LOCALE: 'en',
	LOCALE_SYNONYMS: {},
	DEFAULT_API_VERSION: 12,
	TOAST_DELAY: 4000,
};
