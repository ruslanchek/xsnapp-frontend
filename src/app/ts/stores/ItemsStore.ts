import { Store } from 'react-stores';

export namespace ItemsStore {
	export enum EFileType {
		Thumbnail = 'thumbnail',
		Video = 'video',
		Preview = 'preview',
	}

	export interface ICategory {
		id: number;
		title: string;
	}

	export interface IItemUser {
		id: number;
		username: string;
	}

	export interface IItem {
		avgFrameRate: number;
		duration: number;
		id: number;
		title: string;
		priority: number;
		processedDate: Date;
		videoFiles: IVideoFile[];
		description: string;
		tags: string[];
		views: number;
		user: IItemUser;
		category: ICategory;
	}

	export interface IVideoFile {
		fileName: string;
		id: number;
		type: string;
		main: boolean;
	}

	export interface IState {
		items: IItem[];
	}

	export const initialState: IState = {
		items: [],
	};

	export let store: Store<IState> = new Store<IState>(initialState);
}
