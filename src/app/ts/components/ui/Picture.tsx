import * as React from 'react';
import { css, cx } from 'react-emotion';
import { COLORS, THEME } from 'app/ts/theme';
import { EVideoFileExtension } from 'app/ts/enums/video';

interface IProps {
	src: string;
	size: number;
	className: string;
}

interface IState {
	loaded: boolean;
	error: boolean;
}

export class Picture extends React.PureComponent<IProps, IState> {
	public state: IState = {
		loaded: false,
		error: false,
	};

	public render() {
		const { size, src, className } = this.props;
		const { loaded, error } = this.state;

		return (
			<div
				className={cx(root, className)}
				style={{
					width: size,
					height: size,
					minWidth: size,
					minHeight: size,
				}}
			>
				{!error ? (
					<img
						width={size}
						height={size}
						className={cx(image, loaded ? 'active' : '')}
						src={src}
						onLoad={() => {
							this.setState({
								error: false,
								loaded: true,
							});
						}}
						onErrorCapture={() => {
							this.setState({
								error: true,
								loaded: true,
							});
						}}
					/>
				) : (
					<i
						style={{
							width: size,
							height: size,
						}}
						className={noImage}
					/>
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

const noImage = css`
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
