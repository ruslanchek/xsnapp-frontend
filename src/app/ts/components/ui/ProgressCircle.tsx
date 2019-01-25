import * as React from 'react';
import { css, cx } from 'react-emotion';

interface IProps {
	percent: number;
	size: number;
	strokeWidth: number;
	meterColor: string;
	valueColor: string;
	className?: string;
}

interface IState {}

export class ProgressCircle extends React.PureComponent<IProps, IState> {
	public state: IState = {};

	public render() {
		const {
			percent,
			size,
			strokeWidth,
			meterColor,
			valueColor,
			className,
		} = this.props;
		const halfSize = size / 2;
		const radius = size / 2 - strokeWidth / 2;
		const CIRCUMFERENCE = 2 * Math.PI * radius;
		const dashoffset = CIRCUMFERENCE * (1 - percent / 100);

		return (
			<div className={cx(root, className)}>
				<svg
					className={circleCn}
					width={size}
					height={size}
					viewBox={`0 0 ${size} ${size}`}
				>
					<circle
						style={{
							stroke: meterColor,
						}}
						className={meterCn}
						cx={halfSize}
						cy={halfSize}
						r={radius}
						strokeWidth={strokeWidth}
					/>
					<circle
						style={{
							strokeDashoffset: dashoffset,
							strokeDasharray: CIRCUMFERENCE,
							stroke: valueColor,
						}}
						className={valueCn}
						cx={halfSize}
						cy={halfSize}
						r={radius}
						strokeWidth={strokeWidth}
					/>
				</svg>
			</div>
		);
	}
}

const root = css``;

const circleCn = css`
	transform: rotate(-90deg);
`;

const meterCn = css`
	fill: none;
`;

const valueCn = css`
	fill: none;
	stroke-linecap: round;
	transition: stroke-dashoffset 0.5s, stroke .5s;
`;
