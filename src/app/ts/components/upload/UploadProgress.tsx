import * as React from 'react';
import { css, cx } from 'react-emotion';
import { EUploadStatus } from './UploadController';
import { COLORS, THEME } from '../../theme';

interface IProps {
	percent: number;
	size: number;
	status: EUploadStatus;
	className?: string;
}

const BLUR_SIZE = 4;
const STROKE_WIDTH = 2;

export class UploadProgress extends React.PureComponent<IProps, {}> {
	public render() {
		let { percent } = this.props;

		if (percent < 0) {
			percent = 0;
		} else if (percent > 100) {
			percent = 100;
		}

		const { status, className } = this.props;
		const size = this.props.size - BLUR_SIZE * 4 - STROKE_WIDTH * 2;
		const fullSize = this.props.size;
		const halfSize = fullSize / 2;
		const radius = size / 2;
		const CIRCUMFERENCE = 2 * Math.PI * radius;
		const dashoffset = CIRCUMFERENCE * (1 - percent / 100);

		let meterColor = COLORS.SKYBLUE.alpha(0.3).toString();
		let valueColor = COLORS.CYAN.toString();
		let showCheckIcon = false;
		let showCrossIcon = false;
		let showText = true;

		switch (status) {
			case EUploadStatus.Uploading: {
				meterColor = COLORS.SKYBLUE.alpha(0.3).toString();
				valueColor = COLORS.CYAN.toString();
				break;
			}

			case EUploadStatus.Done: {
				meterColor = COLORS.GREEN.toString();
				valueColor = COLORS.GREEN.toString();
				showCheckIcon = true;
				showText = false;
				break;
			}

			case EUploadStatus.Error: {
				meterColor = COLORS.RED.toString();
				valueColor = COLORS.RED.toString();
				showCrossIcon = true;
				showText = false;
				break;
			}
		}

		const icons = (
			<g
				transform={`translate(${halfSize + STROKE_WIDTH - 14} ${halfSize +
					STROKE_WIDTH -
					14})`}
			>
				<path
					opacity={showCrossIcon ? 1 : 0}
					transform={`scale(${showCrossIcon ? 1 : 0})`}
					className={iconCn}
					d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"
					fill={COLORS.RED.toString()}
				/>
				<path
					opacity={showCheckIcon ? 1 : 0}
					transform={`scale(${showCheckIcon ? 1 : 0})`}
					className={iconCn}
					d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"
					fill={COLORS.GREEN.toString()}
				/>
			</g>
		);

		return (
			<div
				className={cx(root, className)}
				style={{
					width: fullSize,
					height: fullSize,
				}}
			>
				<svg
					className={circleCn}
					width={fullSize}
					height={fullSize}
					viewBox={`0 0 ${fullSize} ${fullSize}`}
				>
					{icons}
					<text
						alignmentBaseline="middle"
						textAnchor="middle"
						className={percentCn}
						opacity={showText ? 1 : 0}
						transform={`translate(${halfSize + STROKE_WIDTH} ${halfSize +
							STROKE_WIDTH})`}
					>
						{percent}%
					</text>
					<circle
						style={{
							stroke: meterColor,
						}}
						className={meterCn}
						cx={halfSize}
						cy={halfSize}
						r={radius}
						strokeWidth={STROKE_WIDTH}
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
						strokeWidth={STROKE_WIDTH}
						transform={`rotate(-90 ${halfSize} ${halfSize})`}
					/>
				</svg>

				<svg
					className={cx(circleCn, blurredCn)}
					width={fullSize}
					height={fullSize}
					viewBox={`0 0 ${fullSize} ${fullSize}`}
				>
					{icons}
					<circle
						style={{
							stroke: meterColor,
						}}
						className={meterCn}
						cx={halfSize}
						cy={halfSize}
						r={radius}
						strokeWidth={STROKE_WIDTH}
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
						strokeWidth={STROKE_WIDTH}
						transform={`rotate(-90 ${halfSize} ${halfSize})`}
					/>
				</svg>
			</div>
		);
	}
}

const root = css`
	position: relative;
`;

const blurredCn = css`
	filter: blur(${BLUR_SIZE}px);
`;

const circleCn = css`
	position: absolute;
	top: 0;
	left: 0;
`;

const meterCn = css`
	fill: none;
	transition: stroke-dashoffset 0.5s, stroke 0.5s;
`;

const valueCn = css`
	fill: none;
	stroke-linecap: round;
	transition: stroke-dashoffset 0.5s, stroke 0.5s;
	font-weight: 200;
`;

const percentCn = css`
	font-weight: 200;
	font-size: ${THEME.FONT_SIZE_BIG}px;
	fill: ${COLORS.WHITE.toString()};
	transition: opacity 0.5s;
`;

const iconCn = css`
	transition: transform 0.5s, opacity 0.5s;
	transform-origin: 7px 7px;
`;
