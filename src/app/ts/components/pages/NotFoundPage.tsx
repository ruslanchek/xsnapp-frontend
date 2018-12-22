import * as React from 'react';
import { Layout } from '../common/Layout';
import { css } from 'react-emotion';

interface IProps {}

interface IState {}

export class NotFoundPage extends React.Component<IProps, IState> {
	public state: IState = {};

	public render() {
		return (
			<Layout showHeader={true} showFooter={true}>
				<main className={root}>
					<h1>404</h1>
				</main>
			</Layout>
		);
	}
}

const root = css`
	padding: 10px;
`;
