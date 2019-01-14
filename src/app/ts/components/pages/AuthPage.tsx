import * as React from 'react';
import { managers } from 'app/ts/managers';
import { PATHS } from 'app/ts/config';
import { Layout } from '../common/Layout';
import { css, keyframes, cx } from 'react-emotion';
import { Form, EFormValidateOn, IFormModelOutput } from '../forms/Form';
import { Input } from '../forms/Input';
import { ValidatorIsEmail } from '../forms/Validators/ValidatorIsEmail';
import { ValidatorIsRequired } from '../forms/Validators/ValidatorIsRequired';
import { Button, EButtonTheme } from '../ui/Button';
import { Link } from 'react-router-dom';
import { THEME, COLORS, COMMON_STYLES } from 'app/ts/theme';
import { SvgIcon, EIconName } from '../ui/SvgIcon';
import { Loader } from '../common/Loader';
import { FormError } from '../ui/FormError';
import { SignIn } from '../auth/SignIn';
import { SignUp } from '../auth/SignUp';
import { PasswordReset } from '../auth/PasswordReset';
import { PasswordResetConfirm } from '../auth/PasswordResetConfirm';
import { Trans } from '../hocs/Trans';

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
			<Layout showHeader={false} showFooter={false}>
				<div className={heading}>
					<Link to={PATHS.HOME} className={close}>
						<SvgIcon name={EIconName.ArrowBack} width="30px" height="30px" />
					</Link>

					{this.authLink}
				</div>

				<main className={root}>{this.getForm}</main>
			</Layout>
		);
	}

	private get authLink() {
		const { type } = this.props;

		switch (type) {
			case EAuthPageFormType.SignIn: {
				return (
					<Link to={PATHS.SIGN_UP} className={authLink}>
						<Trans id="SIGN_UP.LINK"/>
					</Link>
				);
			}

			case EAuthPageFormType.PasswordReset:
			case EAuthPageFormType.PasswordResetConfirm:
			case EAuthPageFormType.SignUp: {
				return (
					<Link to={PATHS.SIGN_IN} className={authLink}>
						<Trans id="SIGN_IN.LINK"/>
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

const heading = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 3;
	position: relative;
	padding: 10px 15px;
`;

const close = css`
	color: ${COLORS.WHITE.toString()} !important;
	width: 30px;
	height: 30px;
	display: block;
	transform: translateX(-6px);
`;

const authLink = css`
	color: ${COLORS.WHITE.toString()} !important;
`;

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
	background-image: linear-gradient(
		10deg,
		${COLORS.GREEN.toString()},
		${COLORS.BLACK.toString()},
		${COLORS.BLACK_EXTRA_LIGHT.toString()}
	);
`;
