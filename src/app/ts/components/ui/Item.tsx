import * as React from 'react';
import * as ReactSwipe from 'react-swipe';
import { css } from 'react-emotion';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { Utils } from 'app/ts/lib/Utils';
import { COLORS, THEME } from 'app/ts/theme';
import { EVideoImageKind, EVideoFileSize } from 'app/ts/enums/video';
import { Image } from './Image';
import { Avatar } from './Avatar';

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
							size={36}
							src="https://randomuser.me/api/portraits/men/51.jpg"
						/>
					</div>

					<div className={titleBlock}>
						<h3 className={h3}>
							{title} {this.state.current}
						</h3>

						<span className={username}>SuperUsername</span>
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
`;

const username = css`
	font-size: ${THEME.FONT_SIZE_SMALL};
	color: ${COLORS.GRAY.toString()};
`;

const header = css`
	display: flex;
	padding: 10px 15px;
	justify-content: flex-start;
	align-items: center;
`;

const titleBlock = css``;

const ava = css`
	overflow: hidden;
	border-radius: 20px;
	margin-right: 10px;
`;
