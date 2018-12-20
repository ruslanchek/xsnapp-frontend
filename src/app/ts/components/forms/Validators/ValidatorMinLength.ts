import { Validator } from './Validator';

export class ValidatorMinLength extends Validator {
	constructor(
		readonly min: number,
		readonly customErrorText?: string,
	) {
		super();
	}

	public validate(value: string): boolean {
		return value && value.length >= this.min;
	}

	public extractError(): string {
		return this.customErrorText || 'MINIMUM_NOT_REACHED';
	}
}
