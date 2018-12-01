import * as React from 'react';
import Color = require('color');
import { COLORS } from 'app/ts/theme';

interface IProps {
	color: Color;
	size?: number;
}

interface IState {}

export class Loader extends React.PureComponent<IProps, IState> {
	public static defaultProps: Partial<IProps> = {
		color: COLORS.WHITE,
		size: 50,
	};

	public render() {
		const { color, size } = this.props;

		return (
			<svg
				width={size}
				height={size}
				viewBox="0 0 42 42"
				xmlns="http://www.w3.org/2000/svg"
				stroke={color.toString()}
			>
				<g
					transform="translate(2 2)"
					strokeWidth="3"
					fill="none"
					fillRule="evenodd"
				>
					<circle strokeOpacity="0.2" cx="18" cy="18" r="18" />
					<path d="M36 18c0-9.94-8.06-18-18-18">
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="0 18 18"
							to="360 18 18"
							dur="1s"
							repeatCount="indefinite"
						/>
					</path>
				</g>
			</svg>
		);
	}
}
