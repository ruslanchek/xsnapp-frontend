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
		return (
			<img
				width={this.props.size}
				height={this.props.size}
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
	opacity: 0;
	transform: scale(0.94);
	transition: transform 0.2s, opacity 0.2s;
	&.active {
		transform: scale(1);
		opacity: 1;
	}
`;
