import Color = require('color');
import * as React from 'react';
import styled, { keyframes } from 'react-emotion';

interface IProps {
	color: Color;
	size: number;
	className?: string;
}

export class Loading extends React.PureComponent<IProps, {}> {
	public render() {
		const spinnerStyle = {
			width: this.props.size,
			height: this.props.size,
		};

		const segmentStyle = {
			transformOrigin: `${this.props.size / 2}px ${this.props.size / 2}px`,
		};

		const innerStyle = {
			top: this.props.size / 21.3333333333,
			left: this.props.size / 2.20689655172,
			width: this.props.size / 12.8,
			height: this.props.size / 4.57142857143,
			backgroundColor: this.props.color.toString(),
		};

		return (
			<Container className={this.props.className}>
				<Spinner style={spinnerStyle}>
					<Segment style={segmentStyle}>
						<Inner style={innerStyle}/>
					</Segment>
					<Segment style={segmentStyle}>
						<Inner style={innerStyle}/>
					</Segment>
					<Segment style={segmentStyle}>
						<Inner style={innerStyle}/>
					</Segment>
					<Segment style={segmentStyle}>
						<Inner style={innerStyle}/>
					</Segment>
					<Segment style={segmentStyle}>
						<Inner style={innerStyle}/>
					</Segment>
					<Segment style={segmentStyle}>
						<Inner style={innerStyle}/>
					</Segment>
					<Segment style={segmentStyle}>
						<Inner style={innerStyle}/>
					</Segment>
					<Segment style={segmentStyle}>
						<Inner style={innerStyle}/>
					</Segment>
					<Segment style={segmentStyle}>
						<Inner style={innerStyle}/>
					</Segment>
					<Segment style={segmentStyle}>
						<Inner style={innerStyle}/>
					</Segment>
					<Segment style={segmentStyle}>
						<Inner style={innerStyle}/>
					</Segment>
					<Segment style={segmentStyle}>
						<Inner style={innerStyle}/>
					</Segment>
				</Spinner>
			</Container>
		);
	}
}

const translateKeyframesItem = keyframes`
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
	}
`;

const translateKeyframes = keyframes`
  0% {
		transform: scale(0);
	}

	35% {
		transform: scale(1.1);
	}

	100% {
		transform: scale(1);
	}
`;

const Container = styled('div')`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-width: 100%;
`;

const Spinner = styled('div')`
	display: block;
	position: relative;
	animation-name: ${translateKeyframes};
	animation-duration: .5s;
	animation-iteration-count: 1;
`;

const Segment = styled('div')`
	animation-name: ${translateKeyframesItem};
	animation-duration: 1.2s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	
	:nth-child(1) {
		transform: rotate(0deg);
		animation-delay: -1.1s;
	}

	:nth-child(2) {
		transform: rotate(30deg);
		animation-delay: -1s;
	}

	:nth-child(3) {
		transform: rotate(60deg);
		animation-delay: -.9s;
	}

	:nth-child(4) {
		transform: rotate(90deg);
		animation-delay: -.8s;
	}

	:nth-child(5) {
		transform: rotate(120deg);
		animation-delay: -.7s;
	}

	:nth-child(6) {
		transform: rotate(150deg);
		animation-delay: -.6s;
	}

	:nth-child(7) {
		transform: rotate(180deg);
		animation-delay: -.5s;
	}

	:nth-child(8) {
		transform: rotate(210deg);
		animation-delay: -.4s;
	}

	:nth-child(9) {
		transform: rotate(240deg);
		animation-delay: -.3s;
	}

	:nth-child(10) {
		transform: rotate(270deg);
		animation-delay: -.2s;
	}

	:nth-child(11) {
		transform: rotate(300deg);
		animation-delay: -.1s;
	}

	:nth-child(12) {
		transform: rotate(330deg);
		animation-delay: 0s;
	}
`;

const Inner = styled('i')`
	content: '';
	display: block;
	position: absolute;
	border-radius: 20%;
`;