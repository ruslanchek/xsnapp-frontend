import * as React from 'react';
import { css, cx } from 'react-emotion';
import { THEME, COLORS } from 'app/ts/theme';

interface IProps {
	type: 'submit' | 'button';
}

export class Button extends React.PureComponent<IProps, {}> {
	public render() {
		const { type } = this.props;

		return (
			<button className={button} type={type}>
				{this.props.children}
			</button>
		);
	}
}

const button = css`
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
