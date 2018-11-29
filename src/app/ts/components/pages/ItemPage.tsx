import * as React from 'react';
import { managers } from 'app/ts/managers';
import { EApiRequestType } from 'app/ts/managers/ApiManager';
import { API_PATHS, PATHS } from 'app/ts/config';
import { Layout } from '../common/Layout';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { css } from 'react-emotion';
import { Utils } from 'app/ts/lib/Utils';
import {
	EVideoFileSize,
	EVideoImageKind,
	EVideoFileExtension,
} from 'app/ts/enums/video';
import { PageLoading } from '../common/PageLoading';
import { Comments } from '../blocks/Comments';
import { COLORS, THEME } from 'app/ts/theme';
import { Surface } from '../common/Surface';

interface IProps {
	routeParams: {
		id: string;
	};
}

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
			API_PATHS.GET_ITEM.replace(':id', this.props.routeParams.id),
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
			<Layout showHeader={true}>
				<main className={root}>{this.content}</main>
			</Layout>
		);
	}

	private get content() {
		const { isLoaded } = this.state;

		if (isLoaded) {
			const { videoFiles, id, title, views } = this.state.item;

			const videos = videoFiles.filter(
				videoFile => videoFile.type === ItemsStore.EFileType.Video,
			);

			const thumbs = videoFiles.filter(
				videoFile => videoFile.type === ItemsStore.EFileType.Thumbnail,
			);

			return (
				<Surface>
					<h1 className={titleBlock}>{title}</h1>
					<video
						muted
						className={video}
						controls={true}
						width="100%"
						poster={Utils.getImagePath(
							id,
							thumbs[0].fileName,
							EVideoImageKind.Thumbnail,
						).replace(EVideoFileExtension.Image, EVideoFileExtension.Jpeg)}
						src={Utils.getVideoPath(id, videos, EVideoFileSize.SD)}
					/>
					stats:
					<p>views: {views}</p>
					<Comments itemId={id} />
				</Surface>
			);
		} else {
			return <PageLoading />;
		}
	}
}

const root = css`
	padding: 10px;
`;

const video = css`
	display: block;
`;

const videoContainer = css`
	background-color: ${COLORS.BLACK_LIGHT.toString()};
	border-radius: 3px;
	overflow: hidden;
`;

const titleBlock = css`
	font-size: ${THEME.FONT_SIZE_MEDIUM}px;
	font-weight: 800;
	margin: 0;
	padding: 10px;
`;
