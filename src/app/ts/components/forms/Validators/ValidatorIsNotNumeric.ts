import { Validator } from './Validator';

export class ValidatorIsNotNumeric extends Validator {
	constructor(
		readonly customErrorText?: string,
	) {
		super();
	}

	public validate(value: string): boolean {
		return isNaN(parseFloat(value));
	}

	public extractError(): string {
		return this.customErrorText || 'IS_NUMERIC';
	}
}
