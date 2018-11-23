import * as React from 'react';
import * as ReactSwipe from 'react-swipe';
import VisibilitySensor from 'react-visibility-sensor';
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
	isVisible: boolean;
}

export class Item extends React.PureComponent<IProps, IState> {
	public state: IState = {
		current: 0,
		isVisible: false,
	};

	public render() {
		const { id, videoFiles, title, description, tags } = this.props.item;
		const { isVisible, current } = this.state;

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
							size={45}
							src="https://randomuser.me/api/portraits/men/51.jpg"
						/>
					</div>

					<div className={titleBlock}>
						<div className={titleTop}>
							<h3 className={h3}>
								{title} {current} {isVisible.toString()}
							</h3>
							<MoreHoriz className={more} />
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

				<VisibilitySensor
					scrollCheck={true}
					resizeCheck={true}
					onChange={isVisible =>
						this.setState({
							isVisible,
						})
					}
				>
					<div className={gallery}>
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
											title={title}
											show={
												isVisible &&
												(i === this.state.current ||
													i === this.state.current - 1 ||
													i === this.state.current + 1)
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
				</VisibilitySensor>

				{tags && tags.length > 0 && (
					<div className={tagsBlock}>
						{tags.map((tag, i) => (
							<a key={i} className="tag" href="#">
								#{tag}
							</a>
						))}
					</div>
				)}

				<div className={content}>{description}</div>

				<div className={actions}>
					<div className={actionButton}>
						<ArrowUpwardRounded
							className={actionButtonIcon}
							fontSizeAdjust={14}
						/>
						71
					</div>

					<div className={actionButton}>
						<ChatTwoTone className={actionButtonIcon} fontSizeAdjust={14} />
						Comments
					</div>

					<div className={actionButton}>
						<FavoriteTwoTone className={actionButtonIcon} fontSizeAdjust={14} />
						14
					</div>

					<div className={actionButton}>
						<ShareTwoTone className={actionButtonIcon} fontSizeAdjust={14} />
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
	align-items: top;
`;

const titleBottom = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const username = css`
	color: ${COLORS.GRAY.toString()};
`;

const header = css`
	display: flex;
	padding: 10px;
	justify-content: space-between;
	align-items: top;
`;

const titleBlock = css`
	flex-grow: 1;
`;

const ava = css`
	margin-right: 10px;
`;

const content = css`
	padding: 10px;
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
	font-size: 18px;
`;

const views = css`
	font-weight: 800;
	color: ${COLORS.GRAY.toString()};
	display: flex;
	align-items: center;
	margin-left: 10px;

	.count {
		margin-right: 0.6ex;
	}
`;

const gallery = css`
	background-color: ${COLORS.BLACK_EXTRA_LIGHT.toString()};
`;

const more = css`
	margin-left: 10px;
`;

const tagsBlock = css`
	padding: 10px 10px 0;

	> .tag {
		margin-right: 1ex;
	}
`;
