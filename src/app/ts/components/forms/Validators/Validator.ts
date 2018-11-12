import { IFormModel } from '../Form';

export abstract class Validator {
	public model: IFormModel = null;
	public abstract validate(value: string): boolean;
	public abstract extractError(): string;
}
