import { Manager } from './Manager';
import { managers } from '../managers';
import { ItemsStore } from '../stores/ItemsStore';
import { EApiRequestType } from './ApiManager';
import { API_PATHS } from '../config';

export class CategoriesManager extends Manager {
	public reset(): void {}

	public init(): Promise<any> {
		return Promise.resolve();
	}

	public async fetchItems(): Promise<ItemsStore.ICategory[]> {
		const result = await managers.api.request<{ items: ItemsStore.ICategory[] }>(
			EApiRequestType.GET,
			API_PATHS.GET_CATEGORIES,
			{},
		);

		if (result.data && result.data.items) {
			return result.data.items;
		}

		return [];
	}
}
