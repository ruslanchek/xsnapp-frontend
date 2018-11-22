import * as React from 'react';
import * as ReactSwipe from 'react-swipe';
import { css } from 'react-emotion';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { Utils } from 'app/ts/lib/Utils';
import { COLORS, THEME } from 'app/ts/theme';
import { EVideoImageKind, EVideoFileSize } from 'app/ts/enums/video';
import { Image } from './Image';
import { Avatar } from './Avatar';
import {
	ArrowUpwardRounded,
	ChatTwoTone,
	FavoriteTwoTone,
	ShareTwoTone,
	MoreHoriz,
	RemoveRedEyeRounded,
} from '@material-ui/icons';

interface IProps {
	item: ItemsStore.IItem;
}

interface IState {
	current: number;
}

export class Item extends React.PureComponent<IProps, IState> {
	public state: IState = {
		current: 0,
	};

	public render() {
		const { id, videoFiles, title } = this.props.item;

		const thumbnails = videoFiles
			.filter(videoFile => videoFile.type === ItemsStore.EFileType.Thumbnail)
			.sort((a, b) => {
				return a.fileName.localeCompare(b.fileName);
			});

		const previews = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Preview,
		);

		return (
			<div className={root}>
				<div className={header}>
					<div className={ava}>
						<Avatar
							size={42}
							src="https://randomuser.me/api/portraits/men/51.jpg"
						/>
					</div>

					<div className={titleBlock}>
						<div className={titleTop}>
							<h3 className={h3}>
								{title} {this.state.current}
							</h3>
							<MoreHoriz />
						</div>

						<div className={titleBottom}>
							<span className={username}>SuperUsername</span>
							<div className={views}>
								<span className="count">84</span>
								<RemoveRedEyeRounded fontSize={'inherit'} />
							</div>
						</div>
					</div>
				</div>

				<div>
					<ReactSwipe
						className="carousel"
						swipeOptions={{
							continuous: false,
							callback: (index, elem) => {
								this.setState({ current: index });
							},
							transitionEnd: (index, elem) => {
								console.log(index, elem);
							},
						}}
					>
						{thumbnails.map((thumbnail, i) => (
							<div key={i} className={frame}>
								<div className={imageHolder}>
									<Image
										show={
											i === this.state.current ||
											i === this.state.current - 1 ||
											i === this.state.current + 1
										}
										src={Utils.getImagePath(
											id,
											thumbnail.fileName,
											EVideoImageKind.Thumbnail,
										)}
									/>
								</div>
							</div>
						))}
					</ReactSwipe>
				</div>

				<div className={content}>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy text ever
					since the 1500s, when an unknown printer took a galley of type and
					scrambled it to make a type specimen book1.
				</div>

				<div className={actions}>
					<div className={actionButton}>
						<ArrowUpwardRounded className={actionButtonIcon} />
						71
					</div>

					<div className={actionButton}>
						<ChatTwoTone
							style={{ top: '.05em' }}
							className={actionButtonIcon}
						/>
						Comments
					</div>

					<div className={actionButton}>
						<FavoriteTwoTone
							style={{ top: '.05em' }}
							className={actionButtonIcon}
						/>
						14
					</div>

					<div className={actionButton}>
						<ShareTwoTone className={actionButtonIcon} />
						Share
					</div>
				</div>
			</div>
		);
	}
}

const root = css`
	border-radius: 3px;
	overflow: hidden;
	background-color: ${COLORS.BLACK_LIGHT.toString()};
	margin-top: 10px;

	&:first-of-type {
		margin-top: 0;
	}
`;

const frame = css``;

const imageHolder = css`
	padding-top: 100%;
	position: relative;
`;

const h3 = css`
	margin: 0;
	font-weight: 800;
	color: ${COLORS.GRAY_LIGHT.toString()};
`;

const titleTop = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const titleBottom = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const username = css`
	font-size: ${THEME.FONT_SIZE_SMALL};
	color: ${COLORS.GRAY.toString()};
`;

const header = css`
	display: flex;
	padding: 10px;
	justify-content: space-between;
	align-items: center;
`;

const titleBlock = css`
	flex-grow: 1;
`;

const ava = css`
	overflow: hidden;
	border-radius: 20px;
	margin-right: 10px;
`;

const content = css`
	padding: 10px;
	font-size: ${THEME.FONT_SIZE_SMALL};
	color: ${COLORS.GRAY_LIGHT.toString()};
`;

const actions = css`
	padding: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const actionButton = css`
	display: flex;
	align-items: center;
	font-weight: 800;
	color: ${COLORS.GRAY_LIGHT.toString()};
`;

const actionButtonIcon = css`
	margin-right: 0.4ex;
	position: relative;
`;

const views = css`
	font-size: ${THEME.FONT_SIZE_SMALL}px;
	font-weight: 800;
	color: ${COLORS.GRAY.toString()};
	display: flex;
	align-items: center;

	.count {
		margin-right: 0.6ex;
	}
`;
