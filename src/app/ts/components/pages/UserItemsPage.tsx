import * as React from 'react';
import { Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { ItemsStore } from '../../stores/ItemsStore';
import { managers } from '../../managers';
import IItem = ItemsStore.IItem;

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
				{this.state.items.map((item, i) => {
					return <div key={i}>{item.title}</div>;
				})}
			</Layout>
		);
	}
}

const root = css`
	padding: 15px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;
