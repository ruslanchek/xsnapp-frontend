import * as React from 'react';
import styled, { css } from 'react-emotion';

export enum EIconName {
	ArrowUpward,
	ArrowForward,
	ArrowBack,
	AddBox,
	Add,
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
	[EIconName.ArrowUpward]: require('@img/svg-icons/round-arrow_upward-24px.svg'),
	[EIconName.ArrowForward]: require('@img/svg-icons/round-arrow_forward-24px.svg'),
	[EIconName.ArrowBack]: require('@img/svg-icons/round-arrow_back-24px.svg'),
	[EIconName.AddBox]: require('@img/svg-icons/round-add_box-24px.svg'),
	[EIconName.Add]: require('@img/svg-icons/round-add-24px.svg'),
	[EIconName.Close]: require('@img/svg-icons/round-close-24px.svg'),
	[EIconName.Menu]: require('@img/svg-icons/round-menu-24px.svg'),
	[EIconName.Play]: require('@img/svg-icons/round-play_arrow-24px.svg'),
	[EIconName.More]: require('@img/svg-icons/round-more_horiz-24px.svg'),
	[EIconName.Eye]: require('@img/svg-icons/round-remove_red_eye-24px.svg'),
	[EIconName.Chat]: require('@img/svg-icons/round-chat-24px.svg'),
	[EIconName.Favorite]: require('@img/svg-icons/round-favorite-24px.svg'),
	[EIconName.Share]: require('@img/svg-icons/round-share-24px.svg'),
};

export interface IIconProps extends React.HTMLAttributes<SVGElement> {
	className?: string;
	color?: string;
	filled?: boolean;
	height?: string;
	innerRef?: React.RefObject<HTMLSpanElement>;
	name: EIconName;
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

		const Icon = icons[name].default;

		return (
			<IconStyler
				className={className}
				{...{ innerRef, width, height, color, rotate, filled, stroke }}
			>
				<Icon width="100%" height="100%" {...sharedProps} />
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
