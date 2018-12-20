import { Validator } from './Validator';

export class ValidatorIsEqualModel extends Validator {
	constructor(
		readonly modelName: string,
		readonly customErrorText?: string,
	) {
		super();
	}

	public validate(value: string): boolean {
		return this.model[this.modelName].value === value;
	}

	public extractError(): string {
		return this.customErrorText || 'NOT_EQUAL';
	}
}
