import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { CONFIG, PATHS } from '../config';
import { ERouteAuthRule } from '../managers/RouteManager';
import { HomePage } from './pages/HomePage';
import { Page, PageLayout } from './pages/Page';
import { LoginPage } from './pages/LoginPage';
import { UploadPage } from './pages/UploadPage';
import { ItemPage } from './pages/ItemPage';
import { NotFoundPage } from './pages/NotFoundPage';

interface IState {
	key: number;
}

export class Routes extends React.Component<{}, IState> {
	public render() {
		return (
			<Switch>
				<Route
					exact={true}
					path={PATHS.HOME}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Default}
								authRule={ERouteAuthRule.Shared}
							>
								<HomePage />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.ITEM}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Default}
								authRule={ERouteAuthRule.Shared}
							>
								<ItemPage />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.AUTH_LOGIN}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Default}
								authRule={ERouteAuthRule.Shared}
							>
								<LoginPage />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.UPLOAD}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Default}
								authRule={ERouteAuthRule.AuthorizedOnly}
							>
								<UploadPage />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.NOT_FOUND}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Default}
								authRule={ERouteAuthRule.AuthorizedOnly}
							>
								<NotFoundPage />
							</Page>
						);
					}}
				/>

				<Route
					exact
					path="*"
					render={() => <Redirect to={PATHS.NOT_FOUND} />}
				/>
			</Switch>
		);
	}
}
