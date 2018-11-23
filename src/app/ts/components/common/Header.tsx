import * as React from 'react';
import { css } from 'react-emotion';
import { COLORS, THEME } from 'app/ts/theme';
import { Link } from 'react-router-dom';
import { PATHS } from 'app/ts/config';
import { followStore } from 'react-stores';
import { AuthStore } from 'app/ts/stores/AuthStore';
import { managers } from 'app/ts/managers';
import { MenuRounded } from '@material-ui/icons';

@followStore(AuthStore.store)
export class Header extends React.PureComponent<{}, {}> {
	public render() {
		return (
			<header className={header}>
				{AuthStore.store.state.authorized ? (
					<>
						{managers.route.history.location.pathname === PATHS.UPLOAD ? (
							<Link className={button} to={PATHS.HOME}>
								Home
							</Link>
						) : (
							<Link className={button} to={PATHS.UPLOAD}>
								Upload
							</Link>
						)}
					</>
				) : (
					<Link className={button} to={PATHS.AUTH_LOGIN}>
						Auth
					</Link>
				)}

				<div className={logo}>Porngur</div>

				<div className="menu">
					<MenuRounded fontSize={'large'} />
				</div>
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
	background-color: ${COLORS.BLACK_EXTRA_LIGHT.toString()};
	box-shadow: 0 3px 5px ${COLORS.BLACK.alpha(0.3).toString()};
	display: flex;
	padding: 0 10px;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
`;

const button = css`
	color: ${COLORS.WHITE.toString()} !important;
	padding: 2px 10px 5px;
	display: inline-block;
	text-decoration: none;
	font-weight: 800;
	background-color: ${COLORS.GREEN.toString()};
	border-radius: 4px;
	height: 26px;
	display: flex;
	align-items: center;
	box-shadow: inset 0 -3px 0 0 ${COLORS.BLACK.alpha(0.4).toString()};
`;

const logo = css`
	font-weight: 200;
	font-size: ${THEME.FONT_SIZE_BIG}px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	letter-spacing: 1px;
`;
