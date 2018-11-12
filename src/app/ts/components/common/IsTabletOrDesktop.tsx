import MediaQuery from 'react-responsive';
import * as React from 'react';
import { mq } from '../../lib/CSSUtils';

export class IsTabletOrDesktop extends React.PureComponent<{}, {}> {
	public render() {
		return (
			<MediaQuery query={mq.tabletOrDesktop.replace('@media ', '')}>
				{this.props.children}
			</MediaQuery>
		);
	}
}
