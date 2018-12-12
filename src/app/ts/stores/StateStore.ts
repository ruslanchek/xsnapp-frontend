import { Store } from 'react-stores';

export namespace StateStore {
	export interface IState {
		appReady: boolean;
		online: boolean;
		title: string;
		backAvailable: boolean;
		showHeader: boolean;
	}

	export const initialState: IState = {
		appReady: false,
		online: false,
		title: '',
		backAvailable: false,
		showHeader: false,
	};

	export let store: Store<IState> = new Store<IState>(initialState);
}
