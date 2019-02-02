import * as React from 'react';
import { css, cx, keyframes } from 'react-emotion';
import { ItemsStore } from '../../stores/ItemsStore';
import IItem = ItemsStore.IItem;
import { Surface } from './Surface';
import { Utils } from '../../lib/Utils';
import { EVideoFileKind } from '../../enums/video';
import { Image } from '../ui/Image';
import { COLORS, THEME } from '../../theme';
import { Locale } from '../hocs/Locale';

interface IProps {
	item: IItem;
}

interface IState {}

export class UserListItem extends React.Component<IProps, IState> {
	public state: IState = {};

	public render() {
		const { item } = this.props;

		return (
			<Surface className={root}>
				<div className={image}>{this.image}</div>

				<div className={content}>
					<div className={title}>{item.title}</div>
				</div>
			</Surface>
		);
	}

	private get image() {
		let thumbnails = this.props.item.videoFiles || [];

		thumbnails = thumbnails
			.filter(videoFile => videoFile.main)
			.sort((a, b) => {
				return a === b ? 0 : a ? -1 : 1;
			});

		if (thumbnails.length > 0) {
			return (
				<Image
					title={this.props.item.title}
					show={true}
					src={Utils.getImagePath(
						this.props.item.id,
						thumbnails[0].fileName,
						EVideoFileKind.Thumbnail,
					)}
				/>
			);
		} else {
			return (
				<div className={processing}>
					<span>
						<Locale id="Processing" />
					</span>
				</div>
			);
		}
	}
}

const pattern = keyframes`
	from {
		background-position: 0 0;
	}
	
	to {
		background-position: 100px -100px;
	}
`;

const processing = css`
	background: url(${require('@img/illustrations/pattern-heavy.png')});
	background-position: 0;
	background-size: 40%;
	background-repeat: repeat;
	flex-grow: 1;
	border-radius: 3px;
	animation: ${pattern} 5s infinite linear;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${THEME.FONT_SIZE_SMALL}px;

	> span {
		color: ${COLORS.WHITE.alpha(0.75).toString()};
		background-color: ${COLORS.BLACK.alpha(0.4).toString()};
		padding: 2px 8px 2px;
		border-radius: 10px;
	}
`;

const image = css`
	position: relative;
	width: 100px;
	height: 100px;
	display: flex;
	border-radius: 3px;
	overflow: hidden;
	background-color: ${COLORS.BLACK_EXTRA_LIGHT.toString()};
`;

const root = css`
	margin-bottom: 10px;
	display: flex;

	&:last-of-type {
		margin-bottom: 0;
	}
`;

const title = css`
	font-weight: 800;
	margin: 0;
	font-size: ${THEME.FONT_SIZE_MEDIUM}px;
`;

const content = css`
	padding: 10px;
`;
