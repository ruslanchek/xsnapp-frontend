import MediaQuery from 'react-responsive';
import * as React from 'react';
import { mq } from '../../lib/CSSUtils';

export class IsTablet extends React.PureComponent<{}, {}> {
	public render() {
		return (
			<MediaQuery query={mq.tablet.replace('@media ', '')}>
				{this.props.children}
			</MediaQuery>
		);
	}
}
