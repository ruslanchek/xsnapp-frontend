import MediaQuery from 'react-responsive';
import * as React from 'react';
import { mq } from '../../lib/CSSUtils';

export class IsPhone extends React.PureComponent<{}, {}> {
	public render() {
		return (
			<MediaQuery query={mq.phone.replace('@media ', '')}>
				{this.props.children}
			</MediaQuery>
		);
	}
}
