import * as React from 'react';
import { css, cx } from 'react-emotion';
import { COLORS } from 'app/ts/theme';

interface IProps {
	className?: string;
	onCLick?: () => void;
}

interface IState {}

export class Surface extends React.Component<IProps, IState> {
	public static defaultProps: Partial<IProps> = {
		onCLick: () => {},
	};

	public state: IState = {};

	public render() {
		return (
			<div onClick={this.props.onCLick} className={cx(surface, this.props.className)}>
				{this.props.children}
			</div>
		);
	}
}

const surface = css`
	background-color: ${COLORS.BLACK_LIGHT.toString()};
	border-radius: 3px;
	overflow: hidden;
`;
