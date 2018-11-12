import { RouteManager } from './managers/RouteManager';
import { StorageManager } from './managers/StorageManager';
import { StateStore } from './stores/StateStore';
import { ApiManager } from './managers/ApiManager';
import { ToastManager } from './managers/ToastManager';
import { FakerManager } from './managers/FakerManager';
import { LocaleManager } from './managers/LocaleManager';
import { AuthManager } from './managers/AuthManager';

const PRELOADING_ANIMATION_TIME: number = 0;
const LOADING_ANIMATION_TIME: number = 500;

export class Managers {
	public locale: LocaleManager;
	public route: RouteManager;
	public storage: StorageManager;
	public api: ApiManager;
	public auth: AuthManager;
	public toast: ToastManager;
	public faker: FakerManager;

	private initStartTime: number = 0;

	public constructor() {
		this.locale = new LocaleManager();
		this.route = new RouteManager();
		this.storage = new StorageManager();
		this.api = new ApiManager();
		this.auth = new AuthManager();
		this.toast = new ToastManager();
		this.faker = new FakerManager();

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
		this.toast.reset();
		this.faker.reset();
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

		await this.toast.init();
		this.logTime('ToastManager ready');

		await this.faker.init();
		this.logTime('FakerManager ready');
	}
}

export const managers = new Managers();
