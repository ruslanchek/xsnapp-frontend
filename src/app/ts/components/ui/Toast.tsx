import * as React from 'react';
import { THEME } from '../../theme';
import { ToastContainer } from 'react-toastify';
import Transition from 'react-transition-group/Transition';
import { css, keyframes } from 'emotion';

interface IProps {}

interface IState {}

const ANIMATION_DURATION: number = 300;

const ZoomInAndOut = ({ children, position, ...props }) => (
	<Transition
		{...props}
		timeout={ANIMATION_DURATION}
		onEnter={node => node.classList.add(animateIn)}
		onExit={node => {
			node.classList.remove(animateIn);
			node.classList.add(animateOut);
		}}
	>
		{children}
	</Transition>
);

export class Toast extends React.PureComponent<IProps, IState> {
	public render() {
		return (
			<ToastContainer
				transition={ZoomInAndOut}
				className={container}
				closeOnClick={true}
				closeButton={<span />}
			/>
		);
	}
}

const translateKeyframesIn = keyframes`
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
`;

const translateKeyframesOut = keyframes`
	from {
		opacity: 1;
	}
	
	to {
		opacity: 0;
	}
`;

const container = css`
	position: fixed;
	bottom: ${THEME.NAV_HEIGHT + THEME.SECTION_PADDING_V}px;
	left: 0;
	z-index: 1000;
	width: 100%;
	display: flex;
	justify-content: center;
	box-sizing: border-box;
	flex-direction: column;
	align-items: center;
`;

const animateIn = css`
	animation-name: ${translateKeyframesIn};
	animation-duration: ${ANIMATION_DURATION}ms;
	animation-iteration-count: 1;
	animation-fill-mode: backwards;
	opacity: 1;
`;

const animateOut = css`
	animation-name: ${translateKeyframesOut};
	animation-duration: ${ANIMATION_DURATION}ms;
	animation-iteration-count: 1;
	animation-fill-mode: backwards;
	opacity: 0;
`;
