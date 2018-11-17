import * as React from 'react';
import { css, cx } from 'react-emotion';

interface IProps {
	src: string;
	show: boolean;
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
		if (!this.props.show) {
			return null;
		}

		return (
			<img
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
				className={cx(image, this.state.loaded ? 'active' : '')}
				src={this.props.src}
			/>
		);
	}
}

const image = css`
	display: block;
	object-fit: cover;
	position: absolute;
	top: 0;
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
