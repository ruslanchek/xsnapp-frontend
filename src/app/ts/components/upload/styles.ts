import { COMMON_STYLES } from '../../theme';
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

		> h2 {
			margin-bottom: 0.5em;
		}

		> .text {
			${COMMON_STYLES.TEXT_WHITE_ALPHA}

			i {
				font-weight: 600;
				font-style: normal;
			}
		}
	`,
};
