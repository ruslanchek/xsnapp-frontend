import * as React from 'react';
import { css, cx } from 'react-emotion';
import { COLORS, THEME } from 'app/ts/theme';
import { EVideoFileExtension } from 'app/ts/enums/video';

interface IProps {
	src: string;
	size: number;
	show: boolean;
	username: string;
}

interface IState {
	loaded: boolean;
	error: boolean;
}

export class Avatar extends React.PureComponent<IProps, IState> {
	public state: IState = {
		loaded: false,
		error: false,
	};

	public render() {
		const { size, src, show, username } = this.props;
		const { loaded, error } = this.state;

		const webp = src.replace(
			EVideoFileExtension.Image,
			EVideoFileExtension.Webp,
		);

		const jpeg = src.replace(
			EVideoFileExtension.Image,
			EVideoFileExtension.Jpeg,
		);

		return (
			<div
				className={root}
				style={{
					width: size,
					height: size,
					minWidth: size,
					minHeight: size,
				}}
			>
				{show && (
					<>
						{!error ? (
							<picture>
								<source srcSet={webp} type="image/webp" />
								<source srcSet={jpeg} type="image/jpeg" />
								<img
									width={size}
									height={size}
									className={cx(image, loaded ? 'active' : '')}
									src={jpeg}
									onLoad={() => {
										this.setState({
											error: false,
											loaded: true,
										});
									}}
									onError={() => {
										this.setState({
											error: true,
											loaded: true,
										});
									}}
								/>
							</picture>
						) : (
							<i
								style={{
									width: size,
									height: size,
								}}
								className={noAvatar}
							>
								{username.substr(0, 2)}
							</i>
						)}
					</>
				)}
			</div>
		);
	}
}

const root = css`
	overflow: hidden;
	border-radius: 50%;
	background-color: ${COLORS.BLACK_EXTRA_LIGHT.toString()};
`;

const image = css`
	display: block;
	object-fit: cover;
	opacity: 0;
	transform: scale(0.94);
	transition: transform 0.2s, opacity 0.2s;
	&.active {
		transform: scale(1);
		opacity: 1;
	}
`;

const noAvatar = css`
	font-size: ${THEME.FONT_SIZE_BIG}px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	font-style: normal;
	letter-spacing: 1px;
	font-weight: 400;
	color: ${COLORS.CYAN.toString()};
`;
