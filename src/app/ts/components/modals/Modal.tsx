import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { COLORS, THEME } from '../../theme';
import { Portal } from '../ui/Portal';
import { mq } from '../../lib/CSSUtils';
import styled, { css } from 'react-emotion';

interface IProps {
	isVisible: boolean;
	width?: number;
	containerClassName?: string;
	contentClassName?: string;
	onClose?(): void;
}

interface IState {
	isContentVisible: boolean;
}

const ANIMATION_TIME: number = 350;
const DEFAULT_WIDTH: number = 400;

export class Modal extends React.PureComponent<IProps, IState> {
	public state: IState = {
		isContentVisible: false,
	};

	private animationDelay = null;

	public componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	public componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);

		clearTimeout(this.animationDelay);
	}

	public componentWillReceiveProps(nextProps: IProps) {
		if (nextProps) {
			this.animationDelay = setTimeout(() => {
				this.setState({
					isContentVisible: nextProps.isVisible,
				});
			}, 10);
		}

		if (nextProps.isVisible) {
			document.body.classList.add('hidden');
		} else {
			document.body.classList.remove('hidden');
		}
	}

	public render() {
		return (
			<CSSTransition
				in={this.props.isVisible}
				unmountOnExit
				timeout={ANIMATION_TIME}
				classNames={{
					enter: container.enter,
					enterActive: container.enterActive,
					exit: container.exit,
					exitActive: container.exitActive,
				}}
			>
				<Portal>
					<div className={root} onClick={this.handleClickOnOverlay}>
						<CSSTransition
							in={this.state.isContentVisible}
							unmountOnExit
							timeout={ANIMATION_TIME}
							classNames={{
								enter: content.enter,
								enterActive: content.enterActive,
								exit: content.exit,
								exitActive: content.exitActive,
							}}
						>
							<div className={content.root} onClick={this.handleClickOnContent}>
								{this.props.children}
							</div>
						</CSSTransition>
					</div>
				</Portal>
			</CSSTransition>
		);
	}

	private handleKeyDown = (e: KeyboardEvent) => {
		if (e && e.key && e.key.toLowerCase() === 'escape') {
			this.close();
		}
	};

	private handleClickOnOverlay = () => {
		this.close();
	};

	private close() {
		const { onClose } = this.props;

		if (onClose) {
			onClose();
		}
	}

	private handleClickOnContent = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	};
}

interface IContentProps {
	width: number;
}

const root = css`
	align-items: center;
	background-color: ${COLORS.BLACK_LIGHT.alpha(0.8).toString()};
	bottom: 0;
	left: 0;
	padding: 15px;
	position: fixed;
	right: 0;
	overflow: hidden;
	top: 0;
	z-index: 1000;
	box-sizing: border-box;
	width: 100vw;
	height: 100vh;
`;

const container = {
	enter: css`
		opacity: 0.01;
	`,

	enterActive: css`
		opacity: 1;
		transition: opacity ${ANIMATION_TIME}ms;
	`,

	exit: css`
		opacity: 1;
	`,

	exitActive: css`
		opacity: 0.01;
		transition: opacity ${ANIMATION_TIME}ms;
	`,
};

const content = {
	root: css`
		background-color: ${COLORS.BLACK.toString()};
		border-radius: 6px;
		position: absolute;
		box-shadow: ${THEME.BOX_SHADOW_ELEVATION_2};
		width: calc(100% - 20px);
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		height: calc(80vh + 20px);
		bottom: -20px;
		left: 10px;
	`,

	enter: css`
		transform: translateY(100vh);
	`,

	enterActive: css`
		transform: translateY(0%);
		transition: transform ${ANIMATION_TIME}ms;
		transition-timing-function: spring(100 100 100 -100);
	`,

	exit: css`
		transform: translateY(0%);
	`,

	exitActive: css`
		transform: translateY(100vh);
		transition: transform ${ANIMATION_TIME}ms;
		transition-timing-function: spring(1 90 11 -0.2);
	`,
};
