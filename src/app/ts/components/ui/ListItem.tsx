import * as React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { css } from 'react-emotion';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { COLORS, THEME } from 'app/ts/theme';
import { Avatar } from './Avatar';
import { ListGallery } from './ListGallery';
import { Link } from 'react-router-dom';
import { PATHS } from 'app/ts/config';
import { Utils } from 'app/ts/lib/Utils';
import { Surface } from '../common/Surface';
import { SvgIcon, EIconName } from './SvgIcon';

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
		const {
			id,
			videoFiles,
			title,
			description,
			tags,
			user,
			views,
		} = this.props.item;
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
				<Surface className={root}>
					<div className={header}>
						<div className={ava}>
							<Avatar
								show={isVisible}
								size={45}
								src={Utils.getAvatarPath(user.id)}
							/>
						</div>

						<div className={titleBlock}>
							<div className={titleTop}>
								<h3 className={h3}>{title}</h3>
								<SvgIcon name={EIconName.More} className={more} />
							</div>

							<div className={titleBottom}>
								<span className={username}>{user.username}</span>

								{isVisible && (
									<div className={viewsBlock}>
										<span className="count">{views}</span>
										<SvgIcon name={EIconName.Eye} className={more} />
									</div>
								)}
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
							<SvgIcon
								name={EIconName.ArrowUpward}
								className={actionButtonIcon}
							/>
							71
						</div>

						<div className={actionButton}>
							<SvgIcon name={EIconName.Chat} className={actionButtonIcon} />
							Comments
						</div>

						<div className={actionButton}>
							<SvgIcon name={EIconName.Favorite} className={actionButtonIcon} />
							23
						</div>

						<div className={actionButton}>
							<SvgIcon name={EIconName.Share} className={actionButtonIcon} />
							Share
						</div>
					</div>
				</Surface>
			</VisibilitySensor>
		);
	}
}

const root = css`
	margin-top: 10px;

	&:first-of-type {
		margin-top: 0;
	}
`;

const h3 = css`
	margin: 0;
	font-weight: 800;
	font-size: ${THEME.FONT_SIZE_MEDIUM}px;
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

const viewsBlock = css`
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
