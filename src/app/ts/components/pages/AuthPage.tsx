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

interface IProps {
	type: EAuthPageFormType;
}

interface IState {
	isLoading: boolean;
	error: string;
}

export enum EAuthPageFormType {
	SignIn,
	SignUp,
	RestorePassword,
}

const LOGO_SIZE = 180;

export class AuthPage extends React.Component<IProps, IState> {
	public state: IState = {
		isLoading: false,
		error: null,
	};

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
						Sign up
					</Link>
				);
			}

			case EAuthPageFormType.SignUp: {
				return (
					<Link to={PATHS.SIGN_IN} className={authLink}>
						Sign in
					</Link>
				);
			}
		}
	}

	private get getForm() {
		const { isLoading, error } = this.state;
		const { type } = this.props;

		switch (type) {
			case EAuthPageFormType.SignIn: {
				return (
					<Form
						className={formContainer}
						onSubmit={this.handleSubmitSignIn}
						validateOn={EFormValidateOn.SUBMIT}
					>
						<div className={form}>
							<div className={logo} />

							<div className={head}>
								<h1>Welcome back!</h1>
								<h2>Put your credentials to sign in</h2>
							</div>

							<div className={inputs}>
								<Input
									showError={false}
									containerClassName={input}
									name="email"
									label="E-mail"
									autoComplete="username"
									validators={[new ValidatorIsEmail()]}
								/>

								<Input
									showError={false}
									containerClassName={input}
									name="password"
									label="Password"
									type="password"
									autoComplete="current-password"
									validators={[new ValidatorIsRequired()]}
								/>
								<div className={errorBlock} onClick={this.handleClearErrors}>
									<FormError errors={[error]} />
								</div>
							</div>
						</div>

						<div className={buttons}>
							<Link
								className={cx(
									COMMON_STYLES.LINK_WHITE,
									COMMON_STYLES.BOLD,
									link,
								)}
								to={'#'}
							>
								Forgot your password?
							</Link>

							{isLoading ? (
								<Loader color={COLORS.WHITE} size={40} />
							) : (
								<Button
									className={button}
									theme={EButtonTheme.ThemeRound}
									type="submit"
									iconRight={
										<SvgIcon
											width={'30px'}
											height={'30px'}
											name={EIconName.ArrowForward}
										/>
									}
								>
									Sign in
								</Button>
							)}
						</div>
					</Form>
				);
			}

			case EAuthPageFormType.SignUp: {
				return (
					<Form
						className={formContainer}
						onSubmit={this.handleSubmitSignUp}
						validateOn={EFormValidateOn.SUBMIT}
					>
						<div className={form}>
							<div className={logo} />

							<div className={head}>
								<h1>Welcome</h1>
								<h2>Please register here</h2>
							</div>

							<div className={inputs}>
								<Input
									showError={false}
									containerClassName={input}
									name="email"
									label="E-mail"
									autoComplete="username"
									validators={[new ValidatorIsEmail()]}
								/>

								<Input
									showError={false}
									containerClassName={input}
									name="password"
									label="Password"
									type="password"
									autoComplete="new-password"
									validators={[new ValidatorIsRequired()]}
								/>
								<div className={errorBlock} onClick={this.handleClearErrors}>
									<FormError errors={[error]} />
								</div>
							</div>
						</div>

						<div className={buttons}>
							<Link
								className={cx(
									COMMON_STYLES.LINK_WHITE,
									COMMON_STYLES.BOLD,
									link,
								)}
								to={'#'}
							>
								Forgot your password?
							</Link>

							{isLoading ? (
								<Loader color={COLORS.WHITE} size={40} />
							) : (
								<Button
									className={button}
									theme={EButtonTheme.ThemeRound}
									type="submit"
									iconRight={
										<SvgIcon
											width={'30px'}
											height={'30px'}
											name={EIconName.ArrowForward}
										/>
									}
								>
									Sign up
								</Button>
							)}
						</div>
					</Form>
				);
			}
		}
	}

	private handleClearErrors = () => {
		this.setState({
			error: null,
		});
	};

	private handleSubmitSignUp = async (output: IFormModelOutput) => {
		this.setState({
			error: null,
		});

		if (output.isValid) {
			this.setState({
				isLoading: true,
			});

			const result = await managers.auth.signUp(
				output.values.email,
				output.values.password,
			);

			this.setState({
				isLoading: false,
			});

			if (!result.error && result.data) {
				managers.auth.goAuth();
			} else {
				this.setState({
					error: result.error,
				});
			}
		} else {
			this.setState({
				error: 'Invalid data',
			});
		}
	};

	private handleSubmitSignIn = async (output: IFormModelOutput) => {
		this.setState({
			error: null,
		});

		if (output.isValid) {
			this.setState({
				isLoading: true,
			});

			const result = await managers.auth.signIn(
				output.values.email,
				output.values.password,
			);

			this.setState({
				isLoading: false,
			});

			if (!result.error && result.data) {
				managers.auth.goAuth();
			} else {
				this.setState({
					error: result.error,
				});
			}
		} else {
			this.setState({
				error: 'Invalid data',
			});
		}
	};
}

const form = css`
	flex-direction: column;
	display: flex;
	justify-content: center;
	flex-grow: 1;
	position: relative;
`;

const formContainer = css`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: center;
`;

const buttons = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	justify-self: baseline;
	min-height: 50px;
`;

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

const button = css`
	box-shadow: 0 6px 12px ${COLORS.BLACK.alpha(0.05).toString()};
`;

const link = css`
	text-shadow: 0 1px 1px ${COLORS.BLACK.alpha(0.3).toString()};
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

const input = css`
	margin-bottom: 15px;
`;

const fadeIn = keyframes`
  0% {
  	transform: rotateZ(0deg);
  }
  
  20% {
  	transform: rotateZ(0deg);
  }
  
 	25% {
  	transform: rotateZ(90deg);
  }
  
  45% {
  	transform: rotateZ(90deg);
  }
  
  50% {
  	transform: rotateZ(180deg);
  }
  
  70% {
  	transform: rotateZ(180deg);
  }
  
  75% {
  	transform: rotateZ(270deg);
  }
  
  95% {
  	transform: rotateZ(270deg);
  }
  
  100% {
  	transform: rotateZ(360deg);
  }
`;

const logo = css`
	width: ${LOGO_SIZE}px;
	height: ${LOGO_SIZE}px;
	display: block;
	margin: 0 auto 60px;
	animation: ${fadeIn} 20s infinite;
	border-radius: 50%;

	&:after {
		content: '';
		display: block;
		background-size: 100%;
		background-position: 50%;
		background-repeat: no-repeat;
		z-index: 2;
		width: ${LOGO_SIZE}px;
		height: ${LOGO_SIZE}px;
		margin: 0 auto 60px;
		position: absolute;
		background-image: url(${require('@img/logos/x-logo-blur.png')});
	}
`;

const head = css`
	color: ${COLORS.WHITE.toString()};
	margin-bottom: 30px;

	> h1 {
		margin: 0;
		font-weight: 800;
	}

	> h2 {
		margin: 0;
		font-weight: 800;
		font-size: ${THEME.FONT_SIZE_REGULAR}px;
	}
`;

const errorBlock = css`
	position: absolute;
	top: 100%;
	left: 50%;
	transform: translateX(-50%);
`;

const inputs = css`
	position: relative;
`;
