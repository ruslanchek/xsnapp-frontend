import * as React from 'react';
import { Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { ItemsStore } from '../../stores/ItemsStore';
import { managers } from '../../managers';
import IItem = ItemsStore.IItem;
import { UserListItem } from '../common/UserListItem';
import { PageHeader } from '../common/PageHeader';
import { Locale } from '../hocs/Locale';
import { COLORS } from '../../theme';

interface IProps {}

interface IState {
	loading: boolean;
	items: IItem[];
}

export class UserItemsPage extends React.Component<IProps, IState> {
	public state: IState = {
		loading: true,
		items: [],
	};

	public async componentDidMount() {
		const items = await managers.userItems.fetchItems();

		this.setState({
			loading: false,
			items,
		});
	}

	public render() {
		return (
			<Layout showFooter={true} showHeader={true}>
				<PageHeader
					title={<Locale id="UPLOADS.HEADER" />}
					count={this.state.items.length}
					color={COLORS.SKYBLUE}
				/>

				<div className={filters}>
					<div className="inner">
						<span>Published</span>
						<span>Draft</span>
						<span className="active">Banned</span>
						<span>Processing</span>
						<span>Trending</span>
					</div>
				</div>

				<div className={root}>
					{this.state.items.map((item, i) => {
						return <UserListItem item={item} key={i} />;
					})}
				</div>
			</Layout>
		);
	}
}

const root = css`
	padding: 10px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;

const filters = css`
	overflow-x: scroll;
	width: 100%;
	box-sizing: border-box;
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
`;
