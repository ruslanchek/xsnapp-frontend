import * as React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { css } from 'react-emotion';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { COLORS } from 'app/ts/theme';
import { Avatar } from './Avatar';
import {
	ArrowUpwardRounded,
	ChatTwoTone,
	FavoriteTwoTone,
	ShareTwoTone,
	MoreHoriz,
	RemoveRedEyeRounded,
} from '@material-ui/icons';
import { ListGallery } from './ListGallery';
import { Link } from 'react-router-dom';
import { PATHS } from 'app/ts/config';

interface IProps {
	item: ItemsStore.IItem;
}

interface IState {
	isVisible: boolean;
}

export class ListItem extends React.PureComponent<IProps, IState> {
	public state: IState = {
		isVisible: false,
	};

	public render() {
		const { id, videoFiles, title, description, tags } = this.props.item;
		const { isVisible } = this.state;

		const thumbnails = videoFiles
			.filter(videoFile => videoFile.type === ItemsStore.EFileType.Thumbnail)
			.sort((a, b) => {
				return a.fileName.localeCompare(b.fileName);
			});

		const previews = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Preview,
		);

		return (
			<VisibilitySensor
				partialVisibility={true}
				scrollCheck={true}
				resizeCheck={true}
				onChange={isVisible =>
					this.setState({
						isVisible,
					})
				}
			>
				<div className={root}>
					<div className={header}>
						<div className={ava}>
							<Avatar
								show={isVisible}
								size={45}
								src="https://randomuser.me/api/portraits/men/51.jpg"
							/>
						</div>

						<div className={titleBlock}>
							<div className={titleTop}>
								<h3 className={h3}>{title}</h3>
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

					<Link to={PATHS.ITEM.replace(':id', id.toString())}>
						<ListGallery
							id={id}
							isVisible={isVisible}
							previews={previews}
							thumbnails={thumbnails}
							title={title}
						/>
					</Link>

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
								fontSizeAdjust={10}
							/>
							71
						</div>

						<div className={actionButton}>
							<ChatTwoTone className={actionButtonIcon} fontSizeAdjust={10} />
							Comments
						</div>

						<div className={actionButton}>
							<FavoriteTwoTone
								className={actionButtonIcon}
								fontSizeAdjust={10}
							/>
							23
						</div>

						<div className={actionButton}>
							<ShareTwoTone className={actionButtonIcon} fontSizeAdjust={10} />
							Share
						</div>
					</div>
				</div>
			</VisibilitySensor>
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

const more = css`
	margin-left: 10px;
`;

const tagsBlock = css`
	padding: 10px 10px 0;

	> .tag {
		margin-right: 1ex;
	}
`;
