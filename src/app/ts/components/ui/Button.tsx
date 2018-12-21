import * as React from 'react';
import { css, cx } from 'react-emotion';
import { THEME, COLORS } from 'app/ts/theme';

interface IProps {
	type: 'submit' | 'button';
	iconLeft?: JSX.Element;
	iconRight?: JSX.Element;
	className?: string;
	theme: EButtonTheme;
}

export enum EButtonTheme {
	Theme3d = 'theme3d',
	ThemeRound = 'themeRound',
}

export class Button extends React.PureComponent<IProps, {}> {
	public render() {
		const {
			type,
			children,
			iconLeft,
			iconRight,
			theme,
			className,
		} = this.props;

		const themeClass = themes[theme];

		return (
			<button className={cx(className, themeClass)} type={type}>
				{iconLeft && <span className={iconLeftStyle}>{iconLeft}</span>}
				{children}
				{iconRight && <span className={iconRightStyle}>{iconRight}</span>}
			</button>
		);
	}
}

const themes = {
	themeRound: css`
		outline: none;
		height: ${THEME.INPUT_HEIGHT}px;
		line-height: ${THEME.INPUT_HEIGHT}px;
		background-color: ${COLORS.GREEN.toString()};
		color: ${COLORS.BLACK.toString()};
		border-radius: ${THEME.INPUT_HEIGHT / 2}px;
		border: none;
		font-family: ${THEME.FONT};
		font-size: ${THEME.FONT_SIZE_MEDIUM}px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		padding: 0 15px;
	`,

	theme3d: css`
		color: ${COLORS.BLACK.toString()} !important;
		padding: 2px 10px 5px;
		text-decoration: none;
		font-weight: 800;
		background-color: ${COLORS.GREEN.toString()};
		border-radius: 4px;
		height: 32px;
		display: flex;
		align-items: center;
		border: none;
		font-size: ${THEME.FONT_SIZE_REGULAR}px;
		box-shadow: inset 0 -3px 0 0 ${COLORS.BLACK.alpha(0.4).toString()};
	`,
};

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
