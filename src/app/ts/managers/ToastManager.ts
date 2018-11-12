import Color = require('color');
import { Manager } from './Manager';
import { toast, ToastType } from 'react-toastify';
import { css } from 'emotion';
import { COLORS, THEME } from '../theme';

export enum EToastType {
	Info,
	Error,
	Success,
	Warning,
	Default,
}

export class ToastManager extends Manager {
	public reset(): void {

	}

	public init(): Promise<any> {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}

	public toast(type: EToastType, text: string, delay: number): void {
		toast(text, {
			type: this.getType(type),
			autoClose: delay,
			className: toastStyle,
			bodyClassName: bodyStyle,
			progressClassName: progressStyle,
		});
	}

	private getType(type: EToastType): ToastType {
		switch (type) {
			case EToastType.Info : {
				return toast.TYPE.DEFAULT as ToastType;
			}

			case EToastType.Error : {
				return toast.TYPE.ERROR as ToastType;
			}

			case EToastType.Success : {
				return toast.TYPE.SUCCESS as ToastType;
			}

			case EToastType.Warning : {
				return toast.TYPE.WARNING as ToastType;
			}

			case EToastType.Default :
			default: {
				return toast.TYPE.DEFAULT as ToastType;
			}
		}
	}
}

const toastStyle = css`
  background: ${Color('#000').alpha(0.5).toString()};
	border-radius: 10px;
	font-family: ${THEME.FONT};
	font-size: ${THEME.FONT_SIZE_SMALL}px;
	padding: 10px 15px;
	margin-top: 5px;
	color: ${COLORS.WHITE.toString()};
	box-shadow: ${THEME.BOX_SHADOW_ELEVATION_2};
`;

const progressStyle = css`
	display: block;
	height: 0;
`;

const bodyStyle = css`
  
`;
