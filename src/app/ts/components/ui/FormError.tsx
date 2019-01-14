import * as React from 'react';
import { css, cx } from 'react-emotion';
import { COLORS } from 'app/ts/theme';
import { Trans } from '../hocs/Trans';

interface IProps {
	errors: string[];
	className?: string;
}

interface IState {}

export class FormError extends React.PureComponent<IProps, IState> {
	public state: IState = {};

	public render() {
		const { errors, className } = this.props;

		return (
			<>
				{errors && errors[0] && (
					<div className={cx(error, className)}>
						<Trans id={errors[0]} />
					</div>
				)}
			</>
		);
	}
}

const error = css`
	background-color: ${COLORS.RED.toString()};
	padding: 10px 10px;
	display: flex;
	border-radius: 5px;
	color: ${COLORS.WHITE.toString()};
	font-weight: bold;
`;
