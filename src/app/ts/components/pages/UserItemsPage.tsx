import * as React from 'react';
import { Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { ItemsStore } from '../../stores/ItemsStore';
import { managers } from '../../managers';
import IItem = ItemsStore.IItem;
import { UserListItem } from '../ui/UserListItem';
import { PageHeader } from '../ui/PageHeader';
import { Locale } from '../hocs/Locale';
import { COLORS } from '../../theme';
import { PageLoading } from '../ui/PageLoading';
import { ListFilters } from '../ui/ListFilters';

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
				{this.getContent}
			</Layout>
		);
	}

	private get getContent() {
		if (this.state.loading) {
			return <PageLoading />;
		} else {
			return (
				<>
					<PageHeader
						title={<Locale id="UPLOADS.HEADER" />}
						count={this.state.items.length}
						color={COLORS.SKYBLUE}
					/>

					<ListFilters items={[
						{
							title: 'Published',
							onClick: () => {}
						},

						{
							title: 'Draft',
							isActive: true,
							onClick: () => {}
						},

						{
							title: 'Banned',
							onClick: () => {}
						},

						{
							title: 'Processing',
							onClick: () => {}
						},

						{
							title: 'Trending',
							onClick: () => {}
						}
					]} />

					<div className={root}>
						{this.state.items.map((item, i) => {
							return <UserListItem item={item} key={i} />;
						})}
					</div>
				</>
			);
		}
	}
}

const root = css`
	padding: 10px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;
