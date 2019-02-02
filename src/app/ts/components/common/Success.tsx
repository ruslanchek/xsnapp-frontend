import * as React from 'react';
import { css, keyframes } from 'react-emotion';

interface IProps {}

interface IState {}

export class Success extends React.Component<IProps, IState> {
	public state: IState = {};

	public render() {
		return (
			<div className={root}>
				<svg
					id="successAnimation"
					className="animated"
					xmlns="http://www.w3.org/2000/svg"
					width="70"
					height="70"
					viewBox="0 0 70 70"
				>
					<path
						id="successAnimationResult"
						fill="#D8D8D8"
						d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"
					/>
					<circle
						id="successAnimationCircle"
						cx="35"
						cy="35"
						r="24"
						stroke="#979797"
						strokeWidth="2"
						strokeLinecap="round"
						fill="transparent"
					/>
					<polyline
						id="successAnimationCheck"
						stroke="#979797"
						strokeWidth="2"
						points="23 34 34 43 47 27"
						fill="transparent"
					/>
				</svg>
			</div>
		);
	}
}

const CIRCLE_LENGTH = '151px';
const CHECK_LENGTH = '36px';

const scaleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.5);
  }
  
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const drawCircle = keyframes`
  0% {
    stroke-dashoffset: ${CIRCLE_LENGTH};
  }
  
  100% {
    stroke-dashoffset: 0;
  }
`;

const drawCheck = keyframes`
  0% {
    stroke-dashoffset: ${CHECK_LENGTH};
  }
  
  100% {
    stroke-dashoffset: 0;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  
  100% {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
`;

const root = css`
	#successAnimationCircle {
		stroke-dasharray: ${CIRCLE_LENGTH} ${CIRCLE_LENGTH};
		stroke: #fff;
	}

	#successAnimationCheck {
		stroke-dasharray: ${CHECK_LENGTH} ${CHECK_LENGTH};
		stroke: #fff;
	}

	#successAnimationResult {
		fill: #fff;
		opacity: 0;
	}

	#successAnimation.animated {
		animation: 1s ease-out 0s 1 both ${scaleAnimation};

		#successAnimationCircle {
			animation: 1s cubic-bezier(0.77, 0, 0.175, 1) 0s 1 both ${drawCircle},
				0.3s linear 0.9s 1 both ${fadeOut};
		}

		#successAnimationCheck {
			animation: 1s cubic-bezier(0.77, 0, 0.175, 1) 0s 1 both ${drawCheck},
				0.3s linear 0.9s 1 both ${fadeOut};
		}

		#successAnimationResult {
			animation: 0.3s linear 0.9s both ${fadeIn};
		}
	}
`;
