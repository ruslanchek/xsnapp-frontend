import * as React from 'react';
import { Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { ItemsStore } from '../../stores/ItemsStore';
import { managers } from '../../managers';
import IItem = ItemsStore.IItem;
import { UserListItem } from '../common/UserListItem';
import { PageHeader } from '../common/PageHeader';
import { Locale } from '../hocs/Locale';

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
				/>

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
