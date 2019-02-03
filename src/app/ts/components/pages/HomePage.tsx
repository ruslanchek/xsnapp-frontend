import * as React from 'react';
import { managers } from 'app/ts/managers';
import { Layout } from '../common/Layout';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { ListItem } from '../ui/ListItem';
import { css } from 'react-emotion';
import { PageLoading } from '../ui/PageLoading';

interface IProps {}

interface IState {
	items: ItemsStore.IItem[];
	isLoaded: boolean;
}

export class HomePage extends React.Component<IProps, IState> {
	public state: IState = {
		items: [],
		isLoaded: false,
	};

	public async componentDidMount() {
		const items = await managers.items.fetchItems();

		this.setState({
			items,
			isLoaded: true,
		});
	}

	public render() {
		return (
			<Layout showHeader={true} showFooter={true}>
				<main className={root}>{this.content}</main>
			</Layout>
		);
	}

	private get content() {
		const { isLoaded } = this.state;

		if (isLoaded) {
			return this.state.items.map((item, i) => {
				return <ListItem item={item} key={i} />;
			});
		} else {
			return <PageLoading />;
		}
	}
}

const root = css`
	padding: 10px;
`;
