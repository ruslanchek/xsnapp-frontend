import * as React from 'react';
import { css, cx } from 'react-emotion';
import { EVideoFileExtension } from 'app/ts/enums/video';

interface IProps {
	src: string;
	show: boolean;
	title: string;
}

interface IState {
	loaded: boolean;
	error: boolean;
}

export class Image extends React.PureComponent<IProps, IState> {
	public state: IState = {
		loaded: false,
		error: false,
	};

	public render() {
		const { title, show, src } = this.props;
		const { loaded, error } = this.state;
		const webp = src.replace(
			EVideoFileExtension.Image,
			EVideoFileExtension.Webp,
		);
		const jpeg = src.replace(
			EVideoFileExtension.Image,
			EVideoFileExtension.Jpeg,
		);

		if (!show) {
			return null;
		}

		return (
			<div className={imageContainer}>
				<div className={loading}>Loading...</div>
				<picture>
					<source srcSet={webp} type="image/webp" />
					<source srcSet={jpeg} type="image/jpeg" />
					<img
						className={cx(img, loaded ? 'active' : '')}
						src={jpeg}
						alt={title}
						onLoad={() =>
							this.setState({
								loaded: true,
							})
						}
						onError={() =>
							this.setState({
								error: true,
							})
						}
					/>
				</picture>
			</div>
		);
	}
}

const imageContainer = css`
	position: absolute;
	top: 0;
	height: 100%;
	width: 100%;
`;

const img = css`
	display: block;
	object-fit: cover;
	height: 100%;
	width: 100%;
	opacity: 0;
	transform: scale(0.94);
	transition: transform 0.2s, opacity 0.2s;

	&.active {
		transform: scale(1);
		opacity: 1;
	}
`;

const loading = css`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;
