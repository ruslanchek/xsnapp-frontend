import MediaQuery from 'react-responsive';
import * as React from 'react';
import { mq } from '../../lib/CSSUtils';

export class IsDesktop extends React.PureComponent<{}, {}> {
	public render() {
		return (
			<MediaQuery query={mq.desktop.replace('@media ', '')}>
				{this.props.children}
			</MediaQuery>
		);
	}
}
