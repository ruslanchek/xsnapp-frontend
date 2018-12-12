import * as React from 'react';
import { css, cx } from 'react-emotion';
import { COLORS, THEME } from 'app/ts/theme';
import { Link } from 'react-router-dom';
import { PATHS } from 'app/ts/config';
import { followStore } from 'react-stores';
import { AuthStore } from 'app/ts/stores/AuthStore';
import { managers } from 'app/ts/managers';
import { SvgIcon, EIconName } from '../ui/SvgIcon';
import { Button, EButtonTheme } from '../ui/Button';
import { StateStore } from 'app/ts/stores/StateStore';

@followStore(AuthStore.store)
@followStore(StateStore.store)
export class Header extends React.PureComponent<{}, {}> {
	public render() {
		return (
			<header
				className={cx(header, !StateStore.store.state.showHeader && 'hidden')}
			>
				{managers.route.history.location.pathname === PATHS.UPLOAD ? null : (
					<Link to={PATHS.UPLOAD}>
						<Button type="button" theme={EButtonTheme.Theme3d}>
							Upload
						</Button>
					</Link>
				)}

				<Link className={logoBtn} to={PATHS.HOME}>
					<div className={logo}>🤨</div>
				</Link>

				<div className={menu}>
					<SvgIcon name={EIconName.Menu} width="30px" height="30px" />
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

	&.hidden {
		transform: translateY(-110%);
	}
`;

const logo = css`
	font-weight: 800;
	font-size: ${THEME.FONT_SIZE_BIG}px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	letter-spacing: 1px;
`;

const logoBtn = css`
	color: ${COLORS.WHITE.toString()} !important;
`;

const menu = css`
	height: 30px;
	width: 30px;
	margin-right: -3px;
`;
