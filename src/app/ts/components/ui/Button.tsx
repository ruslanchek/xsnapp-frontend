import * as React from 'react';
import { css, cx } from 'react-emotion';
import { THEME, COLORS } from 'app/ts/theme';

interface IProps {
	type: 'submit' | 'button';
	iconLeft?: JSX.Element;
	iconRight?: JSX.Element;
	className?: string;
	theme: EButtonTheme;
	color?: string;
	onClick?: () => void;
}

export enum EButtonTheme {
	ThreeDimensional = 'ThreeDimensional',
	Round = 'Round',
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
			color,
			onClick,
		} = this.props;

		const styles: any = {};

		if (color) {
			styles.backgroundColor = color;
		}

		return (
			<button
				style={styles}
				className={cx(buttonCn, themes[theme], className)}
				type={type}
				onClick={() => {
					if (onClick) {
						onClick();
					}
				}}
			>
				{iconLeft && <span className={iconLeftStyle}>{iconLeft}</span>}
				{children}
				{iconRight && <span className={iconRightStyle}>{iconRight}</span>}
			</button>
		);
	}
}

const buttonCn = css`
	user-select: none;
	transition: transform 0.2s;

	&:active {
		transform: scale(0.95);
	}
`;

const themes = {
	[EButtonTheme.Round]: css`
		outline: none;
		height: ${THEME.INPUT_HEIGHT}px;
		line-height: ${THEME.INPUT_HEIGHT}px;
		background-color: ${COLORS.CYAN.toString()};
		color: ${COLORS.BLACK.toString()};
		border-radius: ${THEME.INPUT_HEIGHT / 2}px;
		border: none;
		font-family: ${THEME.FONT};
		font-size: ${THEME.FONT_SIZE_MEDIUM}px;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 15px;
	`,

	[EButtonTheme.ThreeDimensional]: css`
		color: ${COLORS.BLACK.toString()} !important;
		padding: 2px 10px 5px;
		text-decoration: none;
		font-weight: 800;
		background-color: ${COLORS.CYAN.toString()};
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
