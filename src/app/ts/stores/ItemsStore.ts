import { Store } from 'react-stores';

export namespace ItemsStore {
	export enum EFileType {
		Thumbnail = 'thumbnail',
		Video = 'video',
		Preview = 'preview',
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
		user: {
			id: number;
			username: string;
		};
	}

	export interface IVideoFile {
		fileName: string;
		id: number;
		type: string;
	}

	export interface IState {}

	export const initialState: IState = {};

	export let store: Store<IState> = new Store<IState>(initialState);
}
