import * as React from 'react';
import { css } from 'react-emotion';
import { COLORS } from '../../theme';

export interface IListFilterItem {
	title: string;
	onClick: () => void;
	isActive?: boolean;
}

interface IProps {
	items: IListFilterItem[];
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
								className={item.isActive ? 'active' : ''}
								key={i}
								onClick={() => item.onClick()}
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
				display: inline;
				padding: 2px 10px 3px;
				border: 1px solid ${COLORS.SKYBLUE.alpha(0.4).toString()};
				border-radius: 3px;
				margin-right: 10px;
				transition: background-color 0.2s, transform 0.2s;

				&:active {
					transform: scale(0.9);
				}

				&.active {
					background-color: ${COLORS.SKYBLUE.alpha(0.8).toString()};
				}
			}
		}
	}
`;
