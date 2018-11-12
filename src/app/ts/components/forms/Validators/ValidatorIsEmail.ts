import { Validator } from './Validator';

export class ValidatorIsEmail extends Validator {
	constructor(
		readonly customErrorText?: string,
	) {
		super();
	}

	public validate(value: string): boolean {
		value = value.trim();
		const regExp: RegExp = /^(([^\!<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regExp.test(value);
	}

	public extractError(): string {
		return this.customErrorText || 'EMAIL_INCORRECT';
	}
}
