import * as React from 'react';
import { css } from 'react-emotion';
import { COLORS } from '../../theme';

export interface IListFilterItem {
	id: string;
	title: string;
}

interface IProps {
	items: IListFilterItem[];
	current: string;
	onSelect: (id: string) => void;
}

interface IState {}

export class ListFilters extends React.PureComponent<IProps, IState> {
	public state: IState = {};

	public render() {
		const { items } = this.props;

		return (
			<div className={filters}>
				<div className="holder">
					<div className="inner">
						{items.map((item, i) => (
							<span
								className={item.id === this.props.current ? 'active' : ''}
								key={i}
								onClick={() => this.props.onSelect(item.id)}
							>
								{item.title}
							</span>
						))}
					</div>
				</div>
			</div>
		);
	}
}

const filters = css`
	overflow: hidden;
	user-select: none;

	> .holder {
		width: 100%;
		box-sizing: border-box;
		overflow-x: scroll;
		overflow-y: hidden;
		margin-bottom: -30px;
		padding-bottom: 30px;
		-webkit-overflow-scrolling: touch;

		> .inner {
			padding: 10px;
			white-space: nowrap;

			> span {
				display: inline-block;
				padding: 2px 10px;
				border: 1px solid ${COLORS.SKYBLUE.alpha(0.4).toString()};
				border-radius: 3px;
				margin-right: 10px;
				transition: background-color 0.2s, transform 0.2s;

				&:active {
					transform: scale(1.2);
				}

				&.active {
					background-color: ${COLORS.SKYBLUE.alpha(0.8).toString()};
				}
			}
		}
	}
`;
