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
	EVideoFileKind,
	EVideoFileExtension,
} from 'app/ts/enums/video';
import { PageLoading } from '../ui/PageLoading';
import { Comments } from '../blocks/Comments';
import { Surface } from '../ui/Surface';
import { ItemHeader } from '../ui/ItemHeader';
import { Tags } from '../ui/Tags';

interface IProps {
	routeParams: {
		itemId: string;
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

	public async componentDidMount() {
		const result = await managers.api.request<{ item: ItemsStore.IItem }>(
			EApiRequestType.GET,
			API_PATHS.GET_ITEM.replace(':itemId', this.props.routeParams.itemId),
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
			<Layout showHeader={true} showFooter={true}>
				<main className={root}>{this.content}</main>
			</Layout>
		);
	}

	private get content() {
		const { isLoaded } = this.state;

		if (isLoaded) {
			const {
				videoFiles,
				description,
				id,
				title,
				views,
				user,
				tags,
			} = this.state.item;

			const videos = videoFiles.filter(
				videoFile => videoFile.type === ItemsStore.EFileType.Video,
			);

			const thumbs = videoFiles.filter(
				videoFile => videoFile.type === ItemsStore.EFileType.Thumbnail,
			);

			return (
				<Surface>
					<ItemHeader
						title={title}
						views={views}
						isVisible={true}
						user={user}
						itemId={id}
					/>

					<video
						muted
						className={video}
						controls={true}
						width="100%"
						poster={Utils.getImagePath(
							id,
							thumbs[0].fileName,
							EVideoFileKind.Thumbnail,
						).replace(EVideoFileExtension.Image, EVideoFileExtension.Jpeg)}
						src={Utils.getVideoPath(id, videos, EVideoFileSize.SD)}
					/>

					<Tags tags={tags} />

					{description && <section className={desc}>{description}</section>}

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

const desc = css`
	padding: 10px;
`;
