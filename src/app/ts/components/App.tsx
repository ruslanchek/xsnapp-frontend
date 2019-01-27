import * as React from 'react';
import { Routes } from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { followStore } from 'react-stores';
import { StateStore } from '../stores/StateStore';
import { Toast } from './ui/Toast';
import { THEME, COLORS } from '../theme';
import { injectGlobal } from 'react-emotion';

const applyGlobal = () => injectGlobal`
	html {
		min-height: 100vh;
	}

	body {
		font-family: ${THEME.FONT};
		font-size: ${THEME.FONT_SIZE_REGULAR}px;
		color: ${COLORS.GRAY_LIGHT.toString()};
		margin: 0;
		background-color: ${COLORS.BLACK.toString()};
		line-height: 1.4;
	}

	h1 {
		font-size: ${THEME.FONT_SIZE_H1}px;
	}

	h2 {
		font-size: ${THEME.FONT_SIZE_BIG}px;
	}
	
	a {
		text-decoration: none;
	}

	a:link,
	a:visited {
		color: ${COLORS.CYAN.toString()};
	}

	a:hover,
	a:active {
		color: ${COLORS.CYAN.lighten(0.5).toString()};
	}
	
	@keyframes Toastify__trackProgress {
	}
	
	.Toastify__progress-bar {
	  animation: Toastify__trackProgress linear 1;
	}
`;

@followStore(StateStore.store)
export class App extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
		applyGlobal();
	}

	public render() {
		if (StateStore.store.state.appReady) {
			return (
				<React.Fragment>
					<Toast />
					<BrowserRouter>
						<Routes />
					</BrowserRouter>
				</React.Fragment>
			);
		} else {
			return null;
		}
	}
}
