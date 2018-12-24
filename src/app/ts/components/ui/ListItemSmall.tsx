import * as React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { css, cx } from 'react-emotion';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { COLORS, THEME } from 'app/ts/theme';
import { Surface } from '../common/Surface';
import { EIconName, SvgIcon } from './SvgIcon';
import { Utils } from '../../lib/Utils';
import { EVideoImageKind } from '../../enums/video';
import { Link } from 'react-router-dom';
import { PATHS } from '../../config';
import { Image } from './Image';

interface IProps {
	item: ItemsStore.IItem;
}

interface IState {
	isVisible: boolean;
	isPreviewLoaded: boolean;
}

export class ListItemSmall extends React.PureComponent<IProps, IState> {
	public state: IState = {
		isVisible: false,
		isPreviewLoaded: false,
	};

	public render() {
		const { id, videoFiles, user, views, title } = this.props.item;
		const { isVisible } = this.state;

		const previews = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Thumbnail,
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
					<Link
						to={PATHS.ITEM.replace(':itemId', String(id))}
						className={videoContainer}
					>
						<Image
							className={picture}
							title={title}
							show={isVisible}
							onLoad={(successful: boolean) => {
								this.setState({
									isPreviewLoaded: true,
								});
							}}
							src={Utils.getImagePath(
								id,
								previews[0].fileName,
								EVideoImageKind.Thumbnail,
							)}
						/>
					</Link>

					<h3 className={titleCn}>{title}</h3>

					<div className={subtitle}>
						<div className={viewsCn}>
							<SvgIcon
								className="icon"
								name={EIconName.Eye}
								width="12px"
								height="12px"
							/>
							{views}
						</div>

						<div className={viewsCn}>
							<SvgIcon
								className="icon"
								name={EIconName.ArrowUpward}
								width="12px"
								height="12px"
							/>
							16
						</div>
					</div>
				</Surface>
			</VisibilitySensor>
		);
	}
}

const root = css`
	width: calc(50vw - 15px);
	margin-top: 10px;
`;

const videoContainer = css`
	width: calc(50vw - 15px);
	height: calc(50vw - 15px);
	display: block;
`;

const picture = css`
	width: calc(50vw - 15px);
	height: calc(50vw - 15px);
	position: static;
	overflow: hidden;
	background-color: ${COLORS.BLACK_EXTRA_LIGHT.toString()};
`;

const titleCn = css`
	font-size: ${THEME.FONT_SIZE_SMALL}px;
	padding: 7px 10px 0;
	margin: 0;
`;

const subtitle = css`
	display: flex;
	justify-content: flex-start;
	margin: 5px 10px;
`;

const viewsCn = css`
	font-size: ${THEME.FONT_SIZE_SMALL}px;
	font-weight: 400;
	color: ${COLORS.GRAY.toString()};
	display: flex;
	align-items: center;

	.icon {
		margin-right: 0.5ex;
	}
`;
