import * as React from 'react';
import { Header } from './Header';
import { css } from 'react-emotion';
import { THEME } from 'app/ts/theme';

export class Layout extends React.PureComponent<{}, {}> {
	public render() {
		return (
			<div className={root}>
				<Header />
				{this.props.children}
			</div>
		);
	}
}

const root = css`
	height: 100vh;
	width: 100vw;
	padding-top: ${THEME.HEADER_HEIGHT}px;
`;
