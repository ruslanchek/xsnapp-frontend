import * as React from 'react';
import { css, cx, keyframes } from 'react-emotion';
import { COLORS } from 'app/ts/theme';
import { Locale } from '../hocs/Locale';

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
						<Locale id={errors[0]} />
					</div>
				)}
			</>
		);
	}
}

const appear = keyframes`
	from {
		opacity: 0;
		transform: scale(.4);
	}
	
	to {
		opacity: 1;
		transform: scale(1);
	}
`;

const error = css`
	background-color: ${COLORS.RED.toString()};
	padding: 8px 10px;
	display: flex;
	border-radius: 5px;
	color: ${COLORS.WHITE.toString()};
	font-weight: bold;
	box-shadow: 0 2px 5px ${COLORS.RED.alpha(0.5).toString()};
	animation: ${appear} 0.2s cubic-bezier(0.74, 0.24, 0.085, 1.185);
`;
