import * as React from 'react';
import { css, cx } from 'react-emotion';
import { Link } from 'react-router-dom';
import { followStore } from 'react-stores';
import { SvgIcon, EIconName } from '../ui/SvgIcon';
import { Button, EButtonTheme } from '../ui/Button';
import { PATHS } from '../../config';
import { AuthStore } from '../../stores/AuthStore';
import { StateStore } from '../../stores/StateStore';
import { managers } from '../../managers';
import { COLORS, THEME } from '../../theme';
import { CSSTransition } from 'react-transition-group';
import { Trans } from '../hocs/Trans';

const ANIMATION_TIME = 200;

@followStore(AuthStore.store)
@followStore(StateStore.store)
export class Header extends React.Component<{}, {}> {
	public render() {
		return (
			<CSSTransition
				in={!StateStore.store.state.hideHeader}
				unmountOnExit
				timeout={ANIMATION_TIME}
				classNames={{
					enter: header.enter,
					enterActive: header.enterActive,
					exit: header.exit,
					exitActive: header.exitActive,
				}}
			>
				<header className={root}>
					{managers.route.history.location.pathname === PATHS.UPLOAD ? null : (
						<Link to={PATHS.UPLOAD}>
							<Button type="button" theme={EButtonTheme.Theme3d}>
								Post
							</Button>
						</Link>
					)}

					<Link className={logo} to={PATHS.HOME} />

					<div className={menu}>
						<SvgIcon name={EIconName.Menu} width="30px" height="30px" />
					</div>
				</header>
			</CSSTransition>
		);
	}
}

const header = {
	enter: css`
		transform: translateY(-105%);
	`,

	enterActive: css`
		transform: translateY(0);
		transition: transform ${ANIMATION_TIME}ms;
	`,

	exit: css`
		transform: translateY(0);
	`,

	exitActive: css`
		transform: translateY(-105%);
		transition: transform ${ANIMATION_TIME}ms;
	`,
};

const root = css`
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
	transition: transform 0.3s;
	top: constant(safe-area-inset-top); /* iOS 11.0 */
	top: env(safe-area-inset-top); /* iOS 11.2 */
`;

const logo = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	letter-spacing: 1px;
	background-image: url(${require('@img/logos/x-logo.svg')});
	background-size: 50%;
	background-position: 50%;
	background-repeat: no-repeat;
	width: ${THEME.HEADER_HEIGHT}px;
	height: ${THEME.HEADER_HEIGHT}px;
	display: block;
`;

const menu = css`
	height: 30px;
	width: 30px;
	margin-right: -3px;
`;
