import * as React from 'react';
import { Routes } from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { followStore } from 'react-stores';
import { StateStore } from '../stores/StateStore';
import { Toast } from './ui/Toast';
import { THEME, COLORS } from '../theme';
import { injectGlobal } from 'react-emotion';

const locales = [
	{
		language: 'en',
		messages: {},
	},
	{
		language: 'ru',
		messages: {},
	},
];

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
