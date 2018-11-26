import * as React from 'react';
import * as ReactSwipe from 'react-swipe';
import { css, cx } from 'react-emotion';
import { COLORS } from 'app/ts/theme';
import { EVideoImageKind } from 'app/ts/enums/video';
import { Image } from './Image';
import { Utils } from 'app/ts/lib/Utils';
import { ItemsStore } from 'app/ts/stores/ItemsStore';

interface IProps {
	isVisible: boolean;
	thumbnails: ItemsStore.IVideoFile[];
	previews: ItemsStore.IVideoFile[];
	title: string;
	id: number;
}

interface IState {
	currentIndex: number;
	isPreviewLoaded: boolean;
}

const START_FRAME = 1;

export class ListGallery extends React.PureComponent<IProps, IState> {
	public state: IState = {
		currentIndex: START_FRAME,
		isPreviewLoaded: false,
	};

	public render() {
		const { isVisible, thumbnails, previews, title, id } = this.props;
		const { currentIndex, isPreviewLoaded } = this.state;

		return (
			<div className={gallery}>
				<div className={pages}>
					{previews && previews.length > 0 && (
						<i className={cx(pageSpecial, currentIndex === 0 && 'active')} />
					)}

					{thumbnails.map((thumbnail, i) => (
						<i
							key={i}
							className={cx(page, i + 1 === currentIndex && 'active')}
						/>
					))}
				</div>

				<ReactSwipe
					className="carousel"
					swipeOptions={{
						startSlide: START_FRAME,
						continuous: false,
						callback: (index, elem) => {
							this.setState({ currentIndex: index });
						},
						transitionEnd: (index, elem) => {
							console.log(index, elem);
						},
					}}
				>
					{previews && previews.length > 0 && (
						<div>
							<div className={imageHolder}>
								<Image
									title={title}
									show={isVisible && (currentIndex === 0 || isPreviewLoaded)}
									onLoad={(successful: boolean) => {
										this.setState({
											isPreviewLoaded: true,
										});
									}}
									src={Utils.getImagePath(
										id,
										previews[0].fileName,
										EVideoImageKind.Preview,
									)}
								/>
							</div>
						</div>
					)}

					{thumbnails.map((thumbnail, i) => (
						<div key={i}>
							<div className={imageHolder}>
								<Image
									title={title}
									show={
										isVisible &&
										(i + 1 === currentIndex ||
											i + 1 === currentIndex - 1 ||
											i + 1 === currentIndex + 1)
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
		);
	}
}

const gallery = css`
	background-color: ${COLORS.BLACK_EXTRA_LIGHT.toString()};
	user-select: none;
	position: relative;
`;

const imageHolder = css`
	padding-top: 100%;
	position: relative;
`;

const pages = css`
	pointer-events: none;
	position: absolute;
	padding: 10px;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
	box-sizing: border-box;
`;

const page = css`
	width: 4px;
	height: 4px;
	transition: transform 0.15s, background-color 0.15s;
	margin: 0 5px 5px;
	background-color: ${COLORS.WHITE.alpha(0.5).toString()};
	border-radius: 50%;

	&.active {
		transform: scale(1.2);
		background-color: ${COLORS.WHITE.alpha(0.8).toString()};
	}
`;

const pageSpecial = css`
	width: 4px;
	height: 4px;
	transition: transform 0.15s, background-color 0.15s;
	margin: 0 5px 5px;
	background-color: ${COLORS.GREEN.alpha(0.75).toString()};
	border-radius: 50%;
	box-shadow: 0 0 1px ${COLORS.BLACK.alpha(0.5).toString()};

	&.active {
		transform: scale(1.2);
		background-color: ${COLORS.GREEN.alpha(1).toString()};
	}
`;
