import * as React from 'react';
import * as ReactSwipe from 'react-swipe';
import { css } from 'react-emotion';
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
`;

const imageHolder = css`
	padding-top: 100%;
	position: relative;
`;
