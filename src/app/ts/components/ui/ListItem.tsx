import * as React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { css } from 'react-emotion';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { COLORS } from 'app/ts/theme';
import { ListGallery } from './ListGallery';
import { Link } from 'react-router-dom';
import { PATHS } from 'app/ts/config';
import { Surface } from './Surface';
import { SvgIcon, EIconName } from './SvgIcon';
import { ItemHeader } from './ItemHeader';
import { Tags } from './Tags';

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
				return a === b ? 0 : a ? -1 : 1;
			});

		const previews = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Preview,
		);

		return (
			<VisibilitySensor
				partialVisibility={true}
				scrollCheck={true}
				resizeCheck={true}
				onChange={visible =>
					this.setState({
						isVisible: visible,
					})
				}
			>
				<Surface className={root}>
					<ItemHeader
						title={title}
						user={user}
						isVisible={isVisible}
						views={views}
						itemId={id}
					/>

					<Link to={PATHS.ITEM.replace(':itemId', String(id))}>
						<ListGallery
							id={id}
							isVisible={isVisible}
							previews={previews}
							thumbnails={thumbnails}
							title={title}
						/>
					</Link>

					<Tags tags={tags} />

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
