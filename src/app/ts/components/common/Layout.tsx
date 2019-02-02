import * as React from 'react';
import { Header } from './Header';
import { css, cx } from 'react-emotion';
import { COLORS, THEME } from 'app/ts/theme';
import { Footer } from './Footer';
import { Link } from 'react-router-dom';
import { EIconName, SvgIcon } from '../ui/SvgIcon';

interface IProps {
	showHeader?: boolean;
	showFooter?: boolean;
	backLink?: string;
	topLink?: React.ReactNode;
	background?: ELayoutBackgroundColor;
}

export enum ELayoutBackgroundColor {
	Green = 'Green',
	Blue = 'Blue',
	Skyblue = 'Skyblue',
}

export class Layout extends React.PureComponent<IProps, {}> {
	public static defaultProps: Partial<IProps> = {
		showHeader: false,
		showFooter: false,
		backLink: null,
		topLink: null,
		background: null,
	};

	public render() {
		const {
			showHeader,
			showFooter,
			backLink,
			topLink,
			background,
		} = this.props;
		const additionalRootClassNames = [];

		if (showHeader) {
			additionalRootClassNames.push('show-header');
		}

		if (showFooter) {
			additionalRootClassNames.push('show-footer');
		}

		return (
			<div
				className={cx(
					root,
					background ? backgrounds[background] : null,
					additionalRootClassNames,
				)}
			>
				{showHeader && <Header />}

				{(backLink || topLink) && (
					<div className={heading}>
						{backLink && (
							<Link to={backLink} className={close}>
								<SvgIcon
									name={EIconName.ArrowBack}
									width="30px"
									height="30px"
								/>
							</Link>
						)}

						{topLink && <div className={topLinkCn}>{this.props.topLink}</div>}
					</div>
				)}

				{this.props.children}
				{showFooter && <Footer />}
			</div>
		);
	}
}

const root = css`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	padding: env(safe-area-inset-top) env(safe-area-inset-right)
		env(safe-area-inset-bottom) env(safe-area-inset-left);

	&.show-header {
		height: calc(100vh - ${THEME.HEADER_HEIGHT}px);
		padding-top: ${THEME.HEADER_HEIGHT}px;
	}

	&.show-footer {
		height: calc(100vh - ${THEME.FOOTER_HEIGHT}px);
	}

	&.show-header.show-footer {
		height: calc(100vh - ${THEME.HEADER_HEIGHT + THEME.FOOTER_HEIGHT}px);
	}
`;

const topLinkCn = css`
	> a {
		color: ${COLORS.WHITE.toString()} !important;
		font-weight: 600;
	}
`;

const heading = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 3;
	position: relative;
	padding: 10px 15px;
`;

const close = css`
	color: ${COLORS.WHITE.toString()} !important;
	width: 30px;
	height: 30px;
	display: block;
	transform: translateX(-6px);
`;

const backgrounds = {
	[ELayoutBackgroundColor.Green]: css`
		background: linear-gradient(
			10deg,
			${COLORS.CYAN.toString()},
			${COLORS.BLACK.toString()},
			${COLORS.BLACK.toString()}
		);
	`,

	[ELayoutBackgroundColor.Blue]: css`
		background: linear-gradient(
			10deg,
			${COLORS.BLUE.toString()},
			${COLORS.BLACK.toString()},
			${COLORS.BLACK.toString()}
		);
	`,

	[ELayoutBackgroundColor.Skyblue]: css`
		background: linear-gradient(
			10deg,
			${COLORS.SKYBLUE.toString()},
			${COLORS.BLACK.toString()},
			${COLORS.BLACK.toString()}
		);
	`,
};
