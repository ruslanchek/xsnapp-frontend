import * as React from 'react';
import { PATHS } from 'app/ts/config';
import { ELayoutBackgroundColor, Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { Link } from 'react-router-dom';
import { SignIn } from '../auth/SignIn';
import { SignUp } from '../auth/SignUp';
import { PasswordReset } from '../auth/PasswordReset';
import { PasswordResetConfirm } from '../auth/PasswordResetConfirm';
import { Locale } from '../hocs/Locale';

interface IProps {
	type: EAuthPageFormType;
}

export enum EAuthPageFormType {
	SignIn,
	SignUp,
	PasswordReset,
	PasswordResetConfirm,
}

export class AuthPage extends React.PureComponent<IProps, {}> {
	public render() {
		return (
			<Layout backLink={PATHS.HOME} background={ELayoutBackgroundColor.Green} topLink={this.authLink}>
				<main className={root}>{this.getForm}</main>
			</Layout>
		);
	}

	private get authLink() {
		const { type } = this.props;

		switch (type) {
			case EAuthPageFormType.SignIn: {
				return (
					<Link to={PATHS.SIGN_UP}>
						<Locale id="SIGN_UP.LINK"/>
					</Link>
				);
			}

			case EAuthPageFormType.PasswordReset:
			case EAuthPageFormType.PasswordResetConfirm:
			case EAuthPageFormType.SignUp: {
				return (
					<Link to={PATHS.SIGN_IN}>
						<Locale id="SIGN_IN.LINK"/>
					</Link>
				);
			}
		}
	}

	private get getForm() {
		const { type } = this.props;

		switch (type) {
			case EAuthPageFormType.SignIn: {
				return <SignIn />;
			}

			case EAuthPageFormType.SignUp: {
				return <SignUp />;
			}

			case EAuthPageFormType.PasswordReset: {
				return <PasswordReset />;
			}

			case EAuthPageFormType.PasswordResetConfirm: {
				return <PasswordResetConfirm />;
			}
		}
	}
}

const root = css`
	padding: 15px;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

