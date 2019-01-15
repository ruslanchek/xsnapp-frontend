import { Manager } from './Manager';
import { toast } from 'react-toastify';
import { css, cx, keyframes } from 'emotion';
import { COLORS } from '../theme';
import { CONFIG } from '../config';

export enum EToastType {
	Info,
	Error,
	Success,
	Warning,
	Default,
}

export class ToastManager extends Manager {
	private prevText = null;
	private toastTimeout = null;

	public reset(): void {}

	public init(): Promise<any> {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}

	public toast(type: EToastType, text: string): void {
		if (text !== this.prevText) {
			this.prevText = text;

			toast(text, {
				type: this.getType(type),
				autoClose: CONFIG.TOAST_DELAY,
				className: cx(toastStyle, toastTypes[type]),
				progressClassName: progress,
			});

			clearTimeout(this.toastTimeout);

			this.toastTimeout = setTimeout(() => {
				this.prevText = null;
			}, CONFIG.TOAST_DELAY);
		}
	}

	private getType(type: EToastType) {
		switch (type) {
			case EToastType.Info: {
				return toast.TYPE.DEFAULT;
			}

			case EToastType.Error: {
				return toast.TYPE.ERROR;
			}

			case EToastType.Success: {
				return toast.TYPE.SUCCESS;
			}

			case EToastType.Warning: {
				return toast.TYPE.WARNING;
			}

			case EToastType.Default:
			default: {
				return toast.TYPE.DEFAULT;
			}
		}
	}
}

const appear = keyframes`
	from {
		opacity: 0;
		transform: scale(.4);
	}
	
	to {
		opacity: 1;
		transform: scale(1);
	}
`;

const toastStyle = css`
	color: ${COLORS.WHITE.toString()};
	padding: 8px 10px;
	display: flex;
	border-radius: 5px;
	font-weight: bold;
	animation: ${appear} 0.2s cubic-bezier(0.74, 0.24, 0.085, 1.185);
	margin-bottom: 10px;
`;

const toastTypes = {
	[EToastType.Info]: css`
		background-color: ${COLORS.RED.toString()};
		box-shadow: 0 2px 5px ${COLORS.RED.alpha(0.5).toString()};
	`,

	[EToastType.Error]: css`
		background-color: ${COLORS.RED.toString()};
		box-shadow: 0 2px 5px ${COLORS.RED.alpha(0.5).toString()};
	`,

	[EToastType.Success]: css`
		background-color: ${COLORS.RED.toString()};
		box-shadow: 0 2px 5px ${COLORS.RED.alpha(0.5).toString()};
	`,

	[EToastType.Warning]: css`
		background-color: ${COLORS.RED.toString()};
		box-shadow: 0 2px 5px ${COLORS.RED.alpha(0.5).toString()};
	`,

	[EToastType.Default]: css`
		background-color: ${COLORS.RED.toString()};
		box-shadow: 0 2px 5px ${COLORS.RED.alpha(0.5).toString()};
	`,
};

const translateKeyframesIn = keyframes`
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
`;

const progress = css`
	animation-name: ${translateKeyframesIn};
	display: block;
	height: 0;
	position: absolute;
`;
