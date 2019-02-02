import * as React from 'react';
import { Layout } from '../common/Layout';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { css } from 'react-emotion';

interface IProps {}

interface IState {
	items: ItemsStore.IItem[];
	isLoaded: boolean;
}

export class TermsPage extends React.Component<IProps, IState> {
	public state: IState = {
		items: [],
		isLoaded: false,
	};

	public render() {
		return (
			<Layout showHeader={true} showFooter={true}>
				<main className={root}>Terms text</main>
			</Layout>
		);
	}
}

const root = css`
	padding: 10px;
`;
