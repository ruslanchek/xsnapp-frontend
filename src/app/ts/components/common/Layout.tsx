import * as React from 'react';
import { Header } from './Header';
import { css, cx } from 'react-emotion';
import { THEME } from 'app/ts/theme';
import { Footer } from './Footer';

interface IProps {
	showHeader: boolean;
	showFooter: boolean;
}

export class Layout extends React.PureComponent<IProps, {}> {
	public render() {
		const { showHeader, showFooter } = this.props;
		const additionalRootClassNames = [];

		if (showHeader) {
			additionalRootClassNames.push('show-header');
		}

		if (showFooter) {
			additionalRootClassNames.push('show-footer');
		}

		return (
			<div className={cx(root, additionalRootClassNames)}>
				{showHeader && <Header />}
				{this.props.children}
				{showFooter && <Footer />}
			</div>
		);
	}
}

const root = css`
	height: 100vh;
	width: 100vw;
	
	&.show-header {
		height: calc(100vh - ${THEME.HEADER_HEIGHT}px);
		padding-top: ${THEME.HEADER_HEIGHT}px;
	}
	
	&.show-footer {
		height: calc(100vh - ${THEME.FOOTER_HEIGHT}px);
	}
	
	&.show-header.show-footer {
		height: calc(100vh - ${THEME.HEADER_HEIGHT + THEME.FOOTER_HEIGHT}px);
	}
`;
