import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { PATHS } from '../config';
import { ERouteAuthRule } from '../managers/RouteManager';
import { HomePage } from './pages/HomePage';
import { Page, PageLayout } from './pages/Page';
import { AuthPage, EAuthPageFormType } from './pages/AuthPage';
import { EUploadPageMode, UploadPage } from './pages/UploadPage';
import { ItemPage } from './pages/ItemPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TVPage } from './pages/TVPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { UserItemsEditPage } from './pages/UserItemsEditPage';
import { UserItemsPage } from './pages/UserItemsPage';
import { TermsPage } from './pages/TermsPage';

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
								<TVPage />
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
								<CategoriesPage />
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
					path={PATHS.PASSWORD_RESET}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Default}
								authRule={ERouteAuthRule.Shared}
							>
								<AuthPage type={EAuthPageFormType.PasswordReset} />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.PASSWORD_RESET_CONFIRM}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Default}
								authRule={ERouteAuthRule.Shared}
							>
								<AuthPage type={EAuthPageFormType.PasswordResetConfirm} />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.UPLOAD_GET_STARTED}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Close}
								authRule={ERouteAuthRule.AuthorizedOnly}
							>
								<UploadPage mode={EUploadPageMode.GetStarted} />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.UPLOAD_DO_UPLOAD}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Close}
								authRule={ERouteAuthRule.AuthorizedOnly}
							>
								<UploadPage mode={EUploadPageMode.Upload} />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.USER_ITEMS}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Close}
								authRule={ERouteAuthRule.AuthorizedOnly}
							>
								<UserItemsPage />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.USER_EDIT_ITEM}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Close}
								authRule={ERouteAuthRule.AuthorizedOnly}
							>
								<UserItemsEditPage routeParams={props.match.params} />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.TERMS}
					render={props => {
						return (
							<Page
								{...props}
								layout={PageLayout.Default}
								authRule={ERouteAuthRule.Shared}
							>
								<TermsPage />
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
