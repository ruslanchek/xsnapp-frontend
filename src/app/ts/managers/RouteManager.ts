import { History } from 'history';

import { PATHS } from '../config';
import { StateStore } from '../stores/StateStore';
import { Manager } from './Manager';
import { THEME } from '../theme';

export enum ERouteAuthRule {
	UnauthorizedOnly,
	AuthorizedOnly,
	Shared,
}

interface IMeta {
	title: string;
}

export class RouteManager extends Manager {
	public history: History | null = null;
	public params: any = {};
	private scrollPos: number = 0;

	public reset(): void {
		window.removeEventListener('scroll', this.scrollHandler);
	}

	public init(): Promise<any> {
		return new Promise((resolve, reject) => {
			window.addEventListener('scroll', this.scrollHandler, {
				passive: true,
			});
			resolve();
		});
	}

	public initPage(
		history: History,
		params: any,
		authRule: ERouteAuthRule,
	): void {
		this.history = history;
		this.params = params;

		this.setMeta();
		this.scroll(0);
	}

	public scroll(x: number): void {
		window.scrollTo(x, 0);
	}

	public go(path: string, replace?: boolean): void {
		if (replace) {
			this.history.replace(path);
			this.scroll(0);
		} else {
			this.history.push(path);
			this.scroll(0);
		}
	}

	public backAvailable(backAvailable: boolean): void {
		StateStore.store.setState({
			backAvailable,
		});
	}

	public setTitle(title: string): void {
		StateStore.store.setState({
			title,
		});
	}

	private setMeta(): void {
		const meta: IMeta = this.getMeta(this.history.location.pathname);

		if (meta) {
			this.setTitle(meta.title);
		}
	}

	private getMeta(path: string): IMeta {
		switch (path) {
			case PATHS.HOME: {
				return {
					title: 'EST',
				};
			}

			default: {
				return null;
			}
		}
	}

	private scrollHandler = event => {
		if (document.body.getBoundingClientRect().top > this.scrollPos) {
			StateStore.store.setState({
				hideHeader: false,
			});
		} else {
			if (window.scrollY > THEME.HEADER_THRESHOLD) {
				StateStore.store.setState({
					hideHeader: true,
				});
			}
		}

		this.scrollPos = document.body.getBoundingClientRect().top;
	};
}
