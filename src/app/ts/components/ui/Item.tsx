import * as React from 'react';
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

		const thumbnail = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Thumbnail,
		);
		const video = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Video,
		);
		const preview = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Preview,
		);

		return (
			<div className={root}>
				<h3 className={h3}>{title}</h3>
				<img
					className={previewImage}
					src={Utils.getFilePath(id, `${thumbnail[0].fileName}.webp`)}
				/>
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
