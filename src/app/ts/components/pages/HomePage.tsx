import * as React from 'react';
import { followStore } from 'react-stores';
import { managers } from 'app/ts/managers';
import { EApiRequestType } from 'app/ts/managers/ApiManager';
import { API_PATHS, CONFIG } from 'app/ts/config';
import { Layout } from '../common/Layout';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { Item } from '../ui/Item';
import { css } from 'react-emotion';

interface IProps {}

interface IState {
	items: ItemsStore.IItem[];
}

export class HomePage extends React.Component<IProps, IState> {
	public state: IState = {
		items: [],
	};

	async componentDidMount() {
		const result = await managers.api.request<{ items: ItemsStore.IItem[] }>(
			EApiRequestType.GET,
			API_PATHS.GET_ITEMS,
			{},
		);

		const { items } = result.data;

		this.setState({
			items,
		});
	}

	public render() {
		return (
			<Layout>
				<main className={root}>
					{this.state.items.map((item, i) => {
						return <Item item={item} key={i} />;
					})}
				</main>
			</Layout>
		);
	}
}

const root = css`
	padding: 15px;
`;
