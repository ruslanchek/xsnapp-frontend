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
					<NavLink to={PATHS.HOME} className="link" activeClassName="active">
						<SvgIcon name={EIconName.ColorHome} width="30px" height="30px" />
					</NavLink>
					<NavLink to={PATHS.SEARCH} className="link" activeClassName="active">
						<SvgIcon name={EIconName.ColorSearch} width="30px" height="30px" />
					</NavLink>
					<NavLink to={PATHS.TV} className="link" activeClassName="active">
						<SvgIcon name={EIconName.ColorTV} width="30px" height="30px" />
					</NavLink>
					<NavLink to={PATHS.CATEGORIES} className="link" activeClassName="active">
						<SvgIcon name={EIconName.ColorCategories} width="30px" height="30px" />
					</NavLink>
					<NavLink to={PATHS.USER} className="link" activeClassName="active">
						<SvgIcon name={EIconName.ColorUser} width="30px" height="30px" />
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
	align-items: center;
	height: ${THEME.FOOTER_HEIGHT}px;
	padding: 2px ${THEME.SECTION_PADDING_H}px;
	
	>.link {
		color: ${COLORS.GRAY.toString()};
		
		&.active {
			color: ${COLORS.GRAY_LIGHT.toString()};
		}
	}
`;
