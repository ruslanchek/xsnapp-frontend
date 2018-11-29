import * as React from 'react';
import { Header } from './Header';
import { css, cx } from 'react-emotion';
import { THEME } from 'app/ts/theme';

interface IProps {
	showHeader: boolean;
}

export class Layout extends React.PureComponent<IProps, {}> {
	public render() {
		const { showHeader } = this.props;

		return (
			<div className={cx(root, showHeader && rootHeader)}>
				{showHeader && <Header />}
				{this.props.children}
			</div>
		);
	}
}

const root = css`
	height: 100vh;
	width: 100vw;
`;

const rootHeader = css`
	height: calc(100vh - ${THEME.HEADER_HEIGHT}px);
	padding-top: ${THEME.HEADER_HEIGHT}px;
`;
