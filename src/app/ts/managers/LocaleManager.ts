import { Manager } from './Manager';
import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';

export interface IStrings extends LocalizedStringsMethods {
	test: string;
	currentDate: string;
}

export class LocaleManager extends Manager {
	public strings: IStrings = null;

	public reset(): void {
	}

	public init(): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this.strings = new LocalizedStrings({
				en: {
					test: 'Help!!!',
					currentDate: 'The current date is {month} {day}, {year}!'
				},
				ru: {
					test: 'Хелп',
					currentDate: 'Сейчас {day} {month}, {year}!'
				},
			});

			this.strings.setLanguage('en');

			console.log(this.strings.formatString(this.strings.currentDate, {
				month: 'Jan',
				day: 12,
				year: 2018
			}));

			console.log(this.strings.test);

			resolve();
		});
	}
}