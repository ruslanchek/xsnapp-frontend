import * as React from 'react';
import { managers } from 'app/ts/managers';
import { EApiRequestType } from 'app/ts/managers/ApiManager';
import { API_PATHS, CONFIG } from 'app/ts/config';
import { Layout } from '../common/Layout';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { ListItem } from '../ui/ListItem';
import { css } from 'react-emotion';
import { PageLoading } from '../common/PageLoading';
import Masonry from 'react-masonry-component';
import { ListItemSmall } from '../ui/ListItemSmall';
import { THEME } from '../../theme';

interface IProps {}

interface IState {
	items: ItemsStore.IItem[];
	isLoaded: boolean;
}

export class CategoriesPage extends React.Component<IProps, IState> {
	public state: IState = {
		items: [],
		isLoaded: false,
	};

	public async componentDidMount() {
		const result = await managers.api.request<{ items: ItemsStore.IItem[] }>(
			EApiRequestType.GET,
			API_PATHS.GET_ITEMS,
			{},
		);

		const { items } = result.data;

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

		const masonryOptions = {
			transitionDuration: 400,
			gutter: 10,
		};

		if (isLoaded) {
			return (
				<Masonry
					className={'my-gallery-class'}
					elementType={'div'}
					options={masonryOptions}
					disableImagesLoaded={false}
					updateOnEachImageLoad={false}
				>
					{this.state.items.map((item, i) => {
						return <ListItemSmall item={item} key={i} />;
					})}
				</Masonry>
			);
		} else {
			return <PageLoading />;
		}
	}
}

const root = css`
	padding: 0 0 ${THEME.FOOTER_HEIGHT + 10}px 10px;
`;
