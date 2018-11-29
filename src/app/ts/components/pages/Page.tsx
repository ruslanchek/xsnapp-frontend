import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { followStore } from 'react-stores';
import { managers } from '../../managers';
import { ERouteAuthRule } from '../../managers/RouteManager';
import { StateStore } from '../../stores/StateStore';
import { AuthStore } from '../../stores/AuthStore';
import { PATHS } from '../../config';

export enum PageLayout {
	Default,
	Close,
}

interface IProps extends RouteComponentProps<{}> {
	layout: PageLayout;
	authRule: ERouteAuthRule;
}

interface IState {
	routeKey: string;
	location: string;
}

@followStore(StateStore.store)
export class Page extends React.Component<IProps, IState> {
	public state: IState = {
		routeKey: null,
		location: null,
	};

	public componentWillMount() {
		managers.route.initPage(
			this.props.history,
			this.props.match.params,
			this.props.authRule,
		);
	}

	public componentDidUpdate() {
		const { key } = this.props.location;
		const { authRule } = this.props;
		const { pathname, hash, search } = this.props.history.location;
		const location = `${pathname}${search}${hash}`;

		if (key !== this.state.routeKey || location !== this.state.location) {
			this.setState(
				{
					routeKey: key,
					location,
				},
				() => {
					managers.route.initPage(
						this.props.history,
						this.props.match.params,
						authRule,
					);
				},
			);
		}
	}

	public render() {
		const redirectUrl: string = this.getRedirectUrl();

		if (redirectUrl) {
			return <Redirect to={redirectUrl} />;
		} else {
			switch (this.props.layout) {
				default: {
					return <div id="appContainer">{this.props.children}</div>;
				}
			}
		}
	}

	private getRedirectUrl(): string {
		let url: string = null;

		switch (this.props.authRule) {
			case ERouteAuthRule.AuthorizedOnly: {
				if (
					!AuthStore.store.state.profile ||
					!AuthStore.store.state.authorized
				) {
					url = PATHS.AUTH_LOGIN;
				}
				break;
			}

			case ERouteAuthRule.UnauthorizedOnly: {
				if (AuthStore.store.state.profile && AuthStore.store.state.authorized) {
					url = PATHS.HOME;
				}
				break;
			}

			case ERouteAuthRule.Shared:
			default: {
			}
		}

		return url;
	}
}
