import { Manager } from './Manager';
import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import { CONFIG } from '../config';

const RESOURCES = {
	en: {
		translation: require('../../locales/en.json'),
	},
};

export class LocaleManager extends Manager {
	public t = null;

	public reset(): void {}

	public async init(): Promise<any> {
		this.t = await i18n.use(reactI18nextModule).init({
			resources: RESOURCES,
			lng: CONFIG.DEFAULT_LOCALE,
			fallbackLng: CONFIG.DEFAULT_LOCALE,
			interpolation: {
				escapeValue: false,
			},
			react: {
				wait: false,
			},
		});

		return Promise.resolve();
	}
}
