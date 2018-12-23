import * as React from 'react';
import { css } from 'react-emotion';
import { COLORS, THEME } from '../../theme';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../config';
import { EIconName, SvgIcon } from '../ui/SvgIcon';

export class Footer extends React.Component<{}, {}> {
	public render() {
		return (
			<footer className={root}>
				<nav className={nav}>
					<NavLink to={PATHS.HOME} exact className="link" activeClassName="active">
						<SvgIcon name={EIconName.ColorHome} width="24px" height="24px" />
					</NavLink>

					<NavLink to={PATHS.SEARCH} exact className="link" activeClassName="active">
						<SvgIcon name={EIconName.ColorSearch} width="22px" height="22px" />
					</NavLink>

					<NavLink to={PATHS.TV} exact className="link" activeClassName="active">
						<SvgIcon name={EIconName.ColorTV} width="26px" height="26px" />
					</NavLink>

					<NavLink to={PATHS.CATEGORIES} exact className="link" activeClassName="active">
						<SvgIcon name={EIconName.ColorCategories} width="24px" height="24px" />
					</NavLink>

					<NavLink to={PATHS.USER} exact className="link" activeClassName="active">
						<SvgIcon name={EIconName.ColorUser} width="24px" height="24px" />
					</NavLink>
				</nav>
			</footer>
		);
	}
}

const root = css`
	height: ${THEME.FOOTER_HEIGHT}px;
	width: 100%;
	position: fixed;
	background-color: ${COLORS.RED.toString()};
	z-index: 1000;
	left: 0;
	bottom: 0;
	background-color: ${COLORS.BLACK_EXTRA_LIGHT.toString()};
	box-shadow: 0 -3px 5px ${COLORS.BLACK.alpha(0.3).toString()};
`;

const nav = css`
	display: flex;
	justify-content: space-between;
	height: ${THEME.FOOTER_HEIGHT}px;
	padding: 0 ${THEME.SECTION_PADDING_H}px;
	
	>.link {
		display: flex;
		color: ${COLORS.GRAY.toString()};
		height: ${THEME.FOOTER_HEIGHT}px;
		align-items: center;
		
		&.active {
			color: ${COLORS.GRAY_LIGHT.toString()};
		}
	}
`;
