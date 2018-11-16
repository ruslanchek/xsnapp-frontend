import * as React from 'react';
import * as ReactSwipe from 'react-swipe';
import { css } from 'react-emotion';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { Utils } from 'app/ts/lib/Utils';
import { COLORS } from 'app/ts/theme';
import { EVideoImageKind, EVideoFileSize } from 'app/ts/enums/video';

interface IProps {
	item: ItemsStore.IItem;
}

export class Item extends React.PureComponent<IProps, {}> {
	public render() {
		const { id, videoFiles, title } = this.props.item;

		const thumbnails = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Thumbnail,
		);

		const previews = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Preview,
		);

		return (
			<div className={root}>
				<h3 className={h3}>{title}</h3>

				<div>
					<ReactSwipe className="carousel" swipeOptions={{ continuous: false }}>
						<div>
							<img
								width="100%"
								src={Utils.getImagePath(
									id,
									previews[0].fileName,
									EVideoImageKind.Preview,
								)}
							/>
						</div>
						{thumbnails.map((thumbnail, i) => (
							<div key={i}>
								<img
									width="100%"
									className={previewImage}
									src={Utils.getImagePath(
										id,
										thumbnail.fileName,
										EVideoImageKind.Thumbnail,
									)}
								/>
							</div>
						))}
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
