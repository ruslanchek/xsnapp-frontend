import * as React from 'react';
import { css } from 'react-emotion';
import { COLORS, THEME } from 'app/ts/theme';
import { Link } from 'react-router-dom';
import { PATHS } from 'app/ts/config';
import { followStore } from 'react-stores';
import { AuthStore } from 'app/ts/stores/AuthStore';

@followStore(AuthStore.store)
export class Header extends React.PureComponent<{}, {}> {
	public render() {
		return (
			<header className={header}>
				{AuthStore.store.state.authorized ? (
					<Link to={PATHS.UPLOAD}>Upload</Link>
				) : (
					<Link to={PATHS.AUTH_LOGIN}>Auth</Link>
				)}
			</header>
		);
	}
}

const header = css`
	height: ${THEME.HEADER_HEIGHT}px;
	width: 100vw;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	background-color: ${COLORS.WHITE.toString()};
	box-shadow: 0 3px 5px ${COLORS.BLACK.alpha(0.08).toString()};
`;
