import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { PATHS } from '../config';
import { ERouteAuthRule } from '../managers/RouteManager';
import { HomePage } from './pages/HomePage';
import { Page, PageLayout } from './pages/Page';
import { AuthPage, EAuthPageFormType } from './pages/AuthPage';
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
					path={PATHS.SEARCH}
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
					path={PATHS.TV}
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
					path={PATHS.CATEGORIES}
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
					path={PATHS.USER}
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
								<ItemPage routeParams={props.match.params} />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.SIGN_IN}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Default}
								authRule={ERouteAuthRule.Shared}
							>
								<AuthPage type={EAuthPageFormType.SignIn} />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.SIGN_UP}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Default}
								authRule={ERouteAuthRule.Shared}
							>
								<AuthPage type={EAuthPageFormType.SignUp} />
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
								layout={PageLayout.Close}
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
								authRule={ERouteAuthRule.Shared}
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
