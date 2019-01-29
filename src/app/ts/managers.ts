import { RouteManager } from './managers/RouteManager';
import { StorageManager } from './managers/StorageManager';
import { StateStore } from './stores/StateStore';
import { ApiManager } from './managers/ApiManager';
import { ToastManager } from './managers/ToastManager';
import { LocaleManager } from './managers/LocaleManager';
import { AuthManager } from './managers/AuthManager';
import { ItemsManager } from './managers/ItemsManager';
import { UserItemsManager } from './managers/UserItemsManager';

export class Managers {
	public locale = new LocaleManager();
	public route = new RouteManager();
	public storage = new StorageManager();
	public api = new ApiManager();
	public auth = new AuthManager();
	public items = new ItemsManager();
	public userItems = new UserItemsManager();
	public toast = new ToastManager();

	private initStartTime: number = 0;

	public constructor() {
		this.init();
	}

	public logTime(text: string): void {
		console.log('Init time', text, Date.now() - this.initStartTime);
	}

	public init(): void {
		this.initStartTime = Date.now();

		this.initManagers()
			.then(() => {
				this.onLoadingFinished().then(() => {});
			})
			.catch(() => {
				this.onLoadingFinished().then(() => {});
			});
	}

	private onLoadingFinished(): Promise<any> {
		return new Promise((resolve, reject) => {
			StateStore.store.setState({
				appReady: true,
			});

			resolve();
		});
	}

	private resetManagers(): void {
		this.locale.reset();
		this.route.reset();
		this.storage.reset();
		this.api.reset();
		this.auth.reset();
		this.items.reset();
		this.userItems.reset();
		this.toast.reset();
	}

	private async initManagers(): Promise<any> {
		await this.locale.init();
		this.logTime('LocaleManager ready');

		await this.route.init();
		this.logTime('RouteManager ready');

		await this.storage.init();
		this.logTime('StorageManager ready');

		await this.api.init();
		this.logTime('APIManager ready');

		await this.auth.init();
		this.logTime('AuthManager ready');

		await this.items.init();
		this.logTime('Items ready');

		await this.userItems.init();
		this.logTime('UserItems ready');

		await this.toast.init();
		this.logTime('ToastManager ready');
	}
}

export const managers = new Managers();
