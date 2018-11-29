import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './components/App';
import { managers } from './managers';

ReactDOM.render(React.createElement(App), document.getElementById('app'));

window.managers = managers;
