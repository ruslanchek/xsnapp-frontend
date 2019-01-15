import { css, keyframes } from 'emotion';
import { COLORS, COMMON_STYLES, THEME } from '../../theme';

const LOGO_SIZE = 180;

const fadeIn = keyframes`
  0% {
  	transform: rotateZ(0deg);
  }
  
  20% {
  	transform: rotateZ(0deg);
  }
  
 	25% {
  	transform: rotateZ(90deg);
  }
  
  45% {
  	transform: rotateZ(90deg);
  }
  
  50% {
  	transform: rotateZ(180deg);
  }
  
  70% {
  	transform: rotateZ(180deg);
  }
  
  75% {
  	transform: rotateZ(270deg);
  }
  
  95% {
  	transform: rotateZ(270deg);
  }
  
  100% {
  	transform: rotateZ(360deg);
  }
`;

export const AUTH_STYLES = {
	form: css`
		flex-direction: column;
		display: flex;
		justify-content: center;
		flex-grow: 1;
		position: relative;
	`,

	formContainer: css`
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		justify-content: center;
	`,

	buttons: css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		justify-self: baseline;
		min-height: 50px;
	`,

	button: css`
		box-shadow: 0 6px 12px ${COLORS.BLACK.alpha(0.05).toString()};
	`,

	link: css`
		text-shadow: 0 1px 1px ${COLORS.BLACK.alpha(0.3).toString()};
		margin-top: 20px;
	`,

	input: css`
		margin-bottom: 15px;
	`,

	logo: css`
		width: 43vw;
		height: 43vw;
		max-width: ${LOGO_SIZE}px;
		max-height: ${LOGO_SIZE}px;
		display: block;
		margin: 0 auto 10px;
		animation: ${fadeIn} 20s infinite;
		border-radius: 50%;

		&:after {
			content: '';
			display: block;
			background-size: 100%;
			background-position: 50%;
			background-repeat: no-repeat;
			z-index: 2;
			width: 43vw;
			height: 43vw;
			max-width: ${LOGO_SIZE}px;
			max-height: ${LOGO_SIZE}px;
			margin: 0 auto 60px;
			position: absolute;
			background-image: url(${require('@img/logos/x-logo-blur.png')});
		}
	`,

	head: css`
		color: ${COLORS.WHITE.toString()};
		margin-bottom: 30px;
		text-align: center;

		> h1 {
			margin: 0;
			font-weight: 800;
		}

		> h2 {
			margin: 0;
			font-weight: 800;
			font-size: ${THEME.FONT_SIZE_REGULAR}px;
		}
	`,

	errorBlock: css`
		position: absolute;
		top: 40px;
	`,

	inputs: css`
		position: relative;
	`,

	legals: css`
		height: 40px;
		text-align: center;
		margin-top: 20px;
		color: ${COLORS.WHITE.alpha(0.75).toString()};

		a {
			${COMMON_STYLES.LINK_WHITE}
		}
	`,
};
