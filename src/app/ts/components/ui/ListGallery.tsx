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
	title: string;
	id: number;
}

interface IState {
	currentIndex: number;
}

export class ListGallery extends React.PureComponent<IProps, IState> {
	public state: IState = {
		currentIndex: 0,
	};

	public render() {
		const { isVisible, thumbnails, title, id } = this.props;
		const { currentIndex } = this.state;

		return (
			<div className={gallery}>
				<ReactSwipe
					className="carousel"
					swipeOptions={{
						continuous: false,
						callback: (index, elem) => {
							this.setState({ currentIndex: index });
						},
						transitionEnd: (index, elem) => {
							console.log(index, elem);
						},
					}}
				>
					{thumbnails.map((thumbnail, i) => (
						<div key={i}>
							<div className={imageHolder}>
								<Image
									title={title}
									show={
										isVisible &&
										(i === currentIndex ||
											i === currentIndex - 1 ||
											i === currentIndex + 1)
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
