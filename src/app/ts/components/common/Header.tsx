import * as React from 'react';
import { css } from 'react-emotion';
import { COLORS, THEME } from 'app/ts/theme';

export class Header extends React.PureComponent<{}, {}> {
	public render() {
		return <header className={header} />;
	}
}

const header = css`
	height: ${THEME.HEADER_HEIGHT}px;
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
	background-color: ${COLORS.WHITE.toString()};
	box-shadow: 0 3px 5px ${COLORS.BLACK.alpha(0.08).toString()};
`;
