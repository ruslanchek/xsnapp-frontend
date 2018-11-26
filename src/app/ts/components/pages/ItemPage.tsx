import * as React from 'react';
import { managers } from 'app/ts/managers';
import { EApiRequestType } from 'app/ts/managers/ApiManager';
import { API_PATHS, PATHS } from 'app/ts/config';
import { Layout } from '../common/Layout';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { css } from 'react-emotion';
import { Utils } from 'app/ts/lib/Utils';
import { EVideoFileSize } from 'app/ts/enums/video';
import { PageLoading } from '../common/PageLoading';
import { Comments } from '../blocks/Comments';

interface IProps {}

interface IState {
	item: ItemsStore.IItem;
	isLoaded: boolean;
}

export class ItemPage extends React.Component<IProps, IState> {
	public state: IState = {
		item: null,
		isLoaded: false,
	};

	async componentDidMount() {
		const result = await managers.api.request<{ item: ItemsStore.IItem }>(
			EApiRequestType.GET,
			API_PATHS.GET_ITEM.replace(':id', managers.route.params.id),
			{},
		);

		if (result.data) {
			const { item } = result.data;
			this.setState({
				item,
				isLoaded: true,
			});
		} else {
			managers.route.go(PATHS.NOT_FOUND, true);
		}
	}

	public render() {
		return (
			<Layout>
				<main className={root}>{this.content}</main>
			</Layout>
		);
	}

	private get content() {
		const { isLoaded } = this.state;

		if (isLoaded) {
			const { videoFiles, id } = this.state.item;

			const videos = videoFiles.filter(
				videoFile => videoFile.type === ItemsStore.EFileType.Video,
			);

			return (
				<div>
					<video
						controls={true}
						width="100%"
						src={Utils.getVideoPath(id, videos, EVideoFileSize.SD)}
					/>
					<Comments />
				</div>
			);
		} else {
			return <PageLoading />;
		}
	}
}

const root = css`
	padding: 10px;
`;
