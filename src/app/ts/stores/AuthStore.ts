import { Store } from 'react-stores';

export namespace AuthStore {
	export interface IProfile {
		email: string;
		emailConfirmed: boolean;
		id: number;
		lastSeen: Date;
		username: string;
	}

	export interface IState {
		authorized: boolean;
		profile: IProfile;
	}

	export const initialState: IState = {
		authorized: false,
		profile: null,
	};

	export let store: Store<IState> = new Store<IState>(initialState);
}
