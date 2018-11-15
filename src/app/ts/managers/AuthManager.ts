import { Manager } from './Manager';
import { managers } from '../managers';
import { EApiRequestType, IApiResult } from './ApiManager';
import { AuthStore } from '../stores/AuthStore';
import { PATHS, API_PATHS } from '../config';

export class AuthManager extends Manager {
	public reset(): void {
		AuthStore.store.setState({
			authorized: false,
			profile: null,
		});
	}

	public logOut(): void {
		this.reset();
		this.setToken('');

		// @TODO: Make checks for Authorized only pages.
		// Redirect to HOME_PAGE from secured
		// routes and refresh page on shared ones.
		managers.route.go(PATHS.HOME);
	}

	public setToken(token: string): void {
		managers.storage.cookies.set('token', token);
	}

	public async auth(): Promise<any> {
		const result = await managers.api.request<any>(
			EApiRequestType.GET,
			API_PATHS.GET_PROFILE,
		);

		if (result && !result.error && result.data) {
			AuthStore.store.setState({
				authorized: true,
				profile: result.data,
			});
		} else {
			AuthStore.store.setState({
				authorized: false,
				profile: null,
			});
		}
	}

	public async login(
		email: string,
		password: string,
	): Promise<IApiResult<any>> {
		const result = await managers.api.request<any>(
			EApiRequestType.POST,
			API_PATHS.AUTH_LOG_IN,
			{
				email,
				password,
			},
		);

		if (!result.error && result.data.token) {
			this.setToken(result.data.token);
			await this.auth();
		}

		return result;
	}

	public async signUp(
		email: string,
		password: string,
	): Promise<IApiResult<any>> {
		const result = await managers.api.request<any>(
			EApiRequestType.POST,
			'/auth/register',
			{
				email,
				password,
			},
		);

		if (!result.error && result.data.token) {
			this.setToken(result.data.token);
			await this.auth();
		}

		return result;
	}

	public init(): Promise<any> {
		return this.auth();
	}
}