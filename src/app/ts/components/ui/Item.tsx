import * as React from 'react';
import * as ReactSwipe from 'react-swipe';
import { css } from 'react-emotion';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { Utils } from 'app/ts/lib/Utils';
import { COLORS } from 'app/ts/theme';
import { EVideoImageKind, EVideoFileSize } from 'app/ts/enums/video';
import { Image } from './Image';

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

		const thumbnails = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Thumbnail,
		);

		const previews = videoFiles.filter(
			videoFile => videoFile.type === ItemsStore.EFileType.Preview,
		);

		return (
			<div className={root}>
				<h3 className={h3}>
					{title} {this.state.current}
				</h3>

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
						{/* <div>
							<img
								width="100%"
								src={Utils.getImagePath(
									id,
									previews[0].fileName,
									EVideoImageKind.Preview,
								)}
							/>
						</div> */}
						{thumbnails.map((thumbnail, i) => (
							<div key={i} className={frame}>
								<div className={imageHolder}>
									<Image
										show={i === this.state.current}
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
			</div>
		);
	}
}

const root = css`
	border-radius: 3px;
	overflow: hidden;
	background-color: ${COLORS.GRAY_LIGHT.toString()};
	margin-top: 20px;

	&:first-of-type {
		margin-top: 0;
	}
`;

const frame = css``;

const imageHolder = css`
	padding-top: 100%;
	position: relative;
`;

const previewImage = css`
	display: block;
	object-fit: cover;
	position: absolute;
	top: 0;
	height: 100%;
	width: 100%;
`;

const h3 = css`
	padding: 10px 15px;
	margin: 0;
`;
