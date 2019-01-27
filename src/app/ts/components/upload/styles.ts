import { COMMON_STYLES, COLORS, THEME } from '../../theme';
import { css } from 'emotion';

export const UPLOAD_STYLES = {
	legals: css`
		height: 40px;
		text-align: center;
		margin-top: 20px;
		position: absolute;
		bottom: 15px;

		${COMMON_STYLES.TEXT_WHITE_ALPHA}

		a {
			${COMMON_STYLES.LINK_WHITE};
		}
	`,

	illustration: css`
		width: 335px;
		min-width: 335px;
		max-width: 335px;
		height: 278px;
		min-height: 278px;
		max-height: 278px;
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: 50%;
	`,

	texts: css`
		text-align: center;
		position: relative;
		top: -60px;
		line-height: 1.5;
		color: ${COLORS.WHITE.toString()};

		h1 {
			margin: 0;
			font-weight: 800;
		}

		.text {
			${COMMON_STYLES.TEXT_WHITE_ALPHA};
			/* font-weight: 800; */

			i {
				color: ${COLORS.WHITE.alpha(0.85).toString()};
				background-color: ${COLORS.SKYBLUE.alpha(0.3).toString()};
				padding: 0 5px 1px;
				border-radius: 3px;
				font-weight: 400;
				font-style: normal;
			}
		}
	`,
};
