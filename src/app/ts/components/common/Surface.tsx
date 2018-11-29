import * as React from 'react';
import { css, cx } from 'react-emotion';
import { COLORS } from 'app/ts/theme';

interface IProps {
	className?: string;
}

interface IState {}

export class Surface extends React.Component<IProps, IState> {
	public state: IState = {};

	public render() {
		return (
			<section className={cx(surface, this.props.className)}>
				{this.props.children}
			</section>
		);
	}
}

const surface = css`
	background-color: ${COLORS.BLACK_LIGHT.toString()};
	border-radius: 3px;
	overflow: hidden;
`;
