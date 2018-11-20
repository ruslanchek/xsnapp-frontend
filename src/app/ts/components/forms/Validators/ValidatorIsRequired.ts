import { Validator } from './Validator';

export class ValidatorIsRequired extends Validator {
	constructor(readonly customErrorText?: string) {
		super();
	}

	public validate(value: string): boolean {
		console.log(value);

		return !!value;
	}

	public extractError(): string {
		return this.customErrorText || 'REQUIRED';
	}
}
