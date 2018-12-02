import * as React from 'react';
import { css, cx } from 'react-emotion';
import { THEME, COLORS } from 'app/ts/theme';

interface IProps {
	type: 'submit' | 'button';
	iconLeft?: JSX.Element;
	iconRight?: JSX.Element;
}

export class Button extends React.PureComponent<IProps, {}> {
	public render() {
		const { type, children, iconLeft, iconRight } = this.props;

		return (
			<button className={button} type={type}>
				{iconLeft && <span className={iconLeftStyle}>{iconLeft}</span>}
				{children}
				{iconRight && <span className={iconRightStyle}>{iconRight}</span>}
			</button>
		);
	}
}

const button = css`
	outline: none;
	height: ${THEME.INPUT_HEIGHT}px;
	line-height: ${THEME.INPUT_HEIGHT}px;
	background-color: ${COLORS.WHITE.toString()};
	color: ${COLORS.GREEN.toString()};
	border-radius: ${THEME.INPUT_HEIGHT / 2}px;
	border: none;
	font-family: ${THEME.FONT};
	font-size: ${THEME.FONT_SIZE_MEDIUM}px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	padding: 0 15px;
`;

const iconLeftStyle = css`
	margin-right: 1ex;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const iconRightStyle = css`
	margin-left: 1ex;
	display: flex;
	align-items: center;
	justify-content: center;
`;
