import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class Portal extends React.PureComponent<{}, {}> {
	public render() {
		return ReactDOM.createPortal(this.props.children, document.getElementById('appContainer'));
	}
}
