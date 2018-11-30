import * as React from 'react';
import styled, { css } from 'react-emotion';

export enum EIconNames {
	ArrowUpward,
	ArrowForward,
	Close,
	Menu,
	Play,
	More,
	Eye,
	Chat,
	Favorite,
	Share,
}

const icons = {
	[EIconNames.Close]: require('@img/svg-icons/add.svg'),
};

export interface IIconProps extends React.HTMLAttributes<SVGElement> {
	className?: string;
	color?: string;
	filled?: boolean;
	height?: string;
	innerRef?: React.RefObject<HTMLSpanElement>;
	name: EIconNames;
	rotate?: number;
	stroke?: number;
	width?: string;
}

export class SvgIcon extends React.PureComponent<IIconProps, any> {
	public static defaultProps = {
		width: '1em',
		height: 'auto',
		color: 'currentColor',
		rotate: 0,
		filled: true,
		stroke: 0,
	};
	public render() {
		const {
			name,
			className,
			width,
			height,
			color,
			rotate,
			filled,
			stroke,
			innerRef,
			...sharedProps
		} = this.props;

		const SvgIcon = icons[name].default;

		return (
			<IconStyler
				className={className}
				{...{ innerRef, width, height, color, rotate, filled, stroke }}
			>
				<SvgIcon width="100%" height="100%" {...sharedProps} />
			</IconStyler>
		);
	}
}

const IconStyler = styled('span')<Partial<IIconProps>>(
	({ width, height, color, rotate, filled, stroke }) => css`
		display: inline-block;
		line-height: 0;
		flex-shrink: 0;
		width: ${width};
		height: ${height};
		transform: rotate(${rotate}deg);
		color: ${color};
		fill: ${filled ? color : 'transparent'};
		stroke: ${stroke ? color : undefined};
		stroke-width: ${stroke}px;
	`,
);
