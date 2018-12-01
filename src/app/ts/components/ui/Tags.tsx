import * as React from 'react';
import { css } from 'react-emotion';

interface IProps {
	tags: string[];
}

interface IState {}

export class Tags extends React.PureComponent<IProps, IState> {
	public state: IState = {};

	public render() {
		const { tags } = this.props;

		return (
			<>
				{tags && tags.length > 0 && (
					<div className={root}>
						{tags.map((tag, i) => (
							<a key={i} className="tag" href="#">
								#{tag}
							</a>
						))}
					</div>
				)}
			</>
		);
	}
}

const root = css`
	padding: 10px 10px 0;

	> .tag {
		margin-right: 1ex;

		&:last-of-type {
			margin-right: 0;
		}
	}
`;
