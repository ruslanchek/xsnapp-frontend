import { Manager } from './Manager';
import { managers } from '../managers';
import { ItemsStore } from '../stores/ItemsStore';
import { EApiRequestType } from './ApiManager';
import { API_PATHS } from '../config';

export class ItemsManager extends Manager {
	public reset(): void {}

	public init<T>(): Promise<T> {
		return new Promise<any>(async (resolve, reject) => {
			resolve();
		});
	}

	public async fetchItems(): Promise<ItemsStore.IItem[]> {
		const result = await managers.api.request<{ items: ItemsStore.IItem[] }>(
			EApiRequestType.GET,
			API_PATHS.GET_ITEMS,
			{},
		);

		if (result.data && result.data.items) {
			return result.data.items;
		}

		return [];
	}
}
