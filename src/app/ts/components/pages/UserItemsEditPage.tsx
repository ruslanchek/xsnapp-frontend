import * as React from 'react';
import { Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { API_PATHS, PATHS } from '../../config';
import { managers } from '../../managers';
import { ItemsStore } from '../../stores/ItemsStore';
import { EApiRequestType } from '../../managers/ApiManager';
import IItem = ItemsStore.IItem;
import { Locale } from '../hocs/Locale';
import { COLORS } from '../../theme';
import { PageHeader } from '../common/PageHeader';

interface IProps {
	routeParams: {
		itemId: string;
	};
}

interface IState {
	item: IItem;
	isLoaded: boolean;
}

export class UserItemsEditPage extends React.Component<IProps, IState> {
	public state: IState = {
		item: null,
		isLoaded: false,
	};

	public async componentDidMount() {
		const result = await managers.api.request<{ item: ItemsStore.IItem }>(
			EApiRequestType.GET,
			API_PATHS.GET_USER_ITEM.replace(':itemId', this.props.routeParams.itemId),
			{},
		);

		if (result.data) {
			const { item } = result.data;

			this.setState({
				item,
				isLoaded: true,
			});
		} else {
			managers.route.go(PATHS.NOT_FOUND, true);
		}
	}

	public render() {
		return (
			<Layout showFooter={true} showHeader={true}>
				<PageHeader
					title={<Locale id="UPLOADS.EDIT_ITEM" />}
					color={COLORS.SKYBLUE}
				/>

				<div className={root}>

				</div>
				{JSON.stringify(this.state.item)}
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