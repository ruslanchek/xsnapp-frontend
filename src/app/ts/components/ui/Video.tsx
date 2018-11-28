import * as React from 'react';
import { css, cx } from 'react-emotion';
import { EVideoFileExtension } from 'app/ts/enums/video';
import { Loader } from '../common/Loader';
import { COLORS } from 'app/ts/theme';
import { CloseRounded } from '@material-ui/icons';

interface IProps {
	src: string;
	show: boolean;
	className?: string;
	onLoad?: (successful: boolean) => void;
}

interface IState {
	loaded: boolean;
	error: boolean;
}

export class Video extends React.PureComponent<IProps, IState> {
	private videoRef: HTMLVideoElement = null;

	public state: IState = {
		loaded: false,
		error: false,
	};

	public render() {
		const { show, src, onLoad, className } = this.props;
		const { loaded, error } = this.state;

		if (!show) {
			return null;
		}

		return (
			<div className={cx(imageContainer, className)}>
				{!loaded && (
					<div className={loading}>
						<Loader color={COLORS.WHITE} />
					</div>
				)}

				{error && (
					<div className={errorBox}>
						<CloseRounded fontSize={'inherit'} />
					</div>
				)}

				{!error && (
					<video
						ref={ref => (this.videoRef = ref)}
						autoPlay={true}
						muted={true}
						controls={false}
						loop={true}
						src={src}
						className={cx(video, loaded ? 'active' : '')}
						onError={() => {
							this.setState({
								error: true,
								loaded: true,
							});

							if (onLoad) {
								onLoad(false);
							}
						}}
						onCanPlay={() => {
							this.setState({
								error: false,
								loaded: true,
							});

							if (onLoad) {
								onLoad(true);
							}

							this.videoRef.play();
						}}
					/>
				)}
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

const video = css`
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

const errorBox = css`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	font-size: 46px;
	color: ${COLORS.GRAY_LIGHT.toString()};
`;
