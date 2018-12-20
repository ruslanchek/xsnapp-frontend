import { Validator } from './Validator';

export class ValidatorMaxLength extends Validator {
	constructor(
		readonly max: number,
		readonly customErrorText?: string,
	) {
		super();
	}

	public validate(value: string): boolean {
		return !value || value.length <= this.max;
	}

	public extractError(): string {
		return this.customErrorText || 'MAXIMUM_REACHED';
	}
}
