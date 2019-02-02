import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './components/App';
import { managers } from './managers';

ReactDOM.render(React.createElement(App), document.getElementById('app'));

if (navigator.serviceWorker) {
	if (navigator.serviceWorker.controller) {
		console.log('Active service worker found, no need to register');
	} else {
		navigator.serviceWorker
			.register('/pwabuilder-sw.js', {
				scope: './',
			})
			.then(reg => {
				console.log(
					'Service worker has been registered for scope:' + reg.scope,
				);
			});
	}
}

window['managers'] = managers;
