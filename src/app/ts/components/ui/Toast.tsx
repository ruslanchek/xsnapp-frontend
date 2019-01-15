import * as React from 'react';
import { THEME } from '../../theme';
import { ToastContainer } from 'react-toastify';
import Transition from 'react-transition-group/Transition';
import { css, keyframes } from 'emotion';
import { CSSTransition } from 'react-transition-group';

interface IProps {}

interface IState {}

const ANIMATION_DURATION: number = 300;

const ZoomInAndOut = ({ children, position, ...props }) => (
	<CSSTransition {...props} timeout={ANIMATION_DURATION} classNames={animation}>
		{children}
	</CSSTransition>
);

export class Toast extends React.PureComponent<IProps, IState> {
	public render() {
		return (
			<ToastContainer
				className={container}
				closeButton={false}
				closeOnClick={true}
				transition={ZoomInAndOut}
			/>
		);
	}
}

const container = css`
	position: fixed;
	top: 15px;
	left: 0;
	z-index: 1000;
	width: 100%;
	display: flex;
	justify-content: center;
	box-sizing: border-box;
	flex-direction: column;
	align-items: center;
`;

const animation = {
	enter: css`
		opacity: 0;
	`,

	enterActive: css`
		opacity: 1;
		transition: opacity 300ms;
	`,

	exit: css`
		opacity: 1;
	`,

	exitActive: css`
		opacity: 0;
		transition: opacity 300ms;
	`,
};
