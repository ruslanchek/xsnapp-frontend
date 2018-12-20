import { Validator } from './Validator';

export class ValidatorRegExp extends Validator {
	constructor(
		readonly regExp: RegExp,
		readonly customErrorText?: string,
	) {
		super();
	}

	public validate(value: string): boolean {
		return this.regExp.test(value);
	}

	public extractError(): string {
		return this.customErrorText || 'INVALID_PATTERN';
	}
}
