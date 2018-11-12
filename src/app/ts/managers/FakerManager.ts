import { Manager } from './Manager';

export class FakerManager extends Manager {
	public reset(): void {}

	public init<T>(): Promise<T> {
		return new Promise<any>(async (resolve, reject) => {
			resolve();
		});
	}
}
