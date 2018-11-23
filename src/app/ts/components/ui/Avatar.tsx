import * as React from 'react';
import { css, cx } from 'react-emotion';
import { COLORS } from 'app/ts/theme';

interface IProps {
	src: string;
	size: number;
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
		const { size, src } = this.props;
		const { loaded, error } = this.state;

		return (
			<div
				className={root}
				style={{
					minWidth: size,
					minHeight: size,
				}}
			>
				<img
					width={size}
					height={size}
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
					className={cx(image, loaded ? 'active' : '')}
					src={src}
				/>
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
