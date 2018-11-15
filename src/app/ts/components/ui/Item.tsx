import * as React from 'react';
import * as ReactSwipe from 'react-swipe';
import { css } from 'react-emotion';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { Utils } from 'app/ts/lib/Utils';
import { COLORS } from 'app/ts/theme';

interface IProps {
	item: ItemsStore.IItem;
}

export class Item extends React.PureComponent<IProps, {}> {
	public render() {
		const { id, videoFiles, title } = this.props.item;

		const thumbnails = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Thumbnail,
		);

		const videos = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Video,
		);

		const previews = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Preview,
		);

		return (
			<div className={root}>
				<h3 className={h3}>{title}</h3>

				<div>
					<ReactSwipe className="carousel" swipeOptions={{ continuous: false }}>
						{thumbnails.map((thumbnail, i) => (
							<div key={i}>
								<img
									className={previewImage}
									src={Utils.getFilePath(id, thumbnail.fileName, 'thumbnail')}
								/>
							</div>
						))}
						<div>
							<img
								src={Utils.getFilePath(id, previews[0].fileName, 'preview')}
							/>
						</div>
					</ReactSwipe>
				</div>
			</div>
		);
	}
}

const root = css`
	border-radius: 3px;
	overflow: hidden;
	background-color: ${COLORS.GRAY_LIGHT.toString()};
	margin-top: 20px;

	&:first-of-type {
		margin-top: 0;
	}
`;

const previewImage = css`
	display: block;
`;

const h3 = css`
	padding: 10px 15px;
	margin: 0;
`;
