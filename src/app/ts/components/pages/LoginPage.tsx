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

interface IProps {}

interface IState {
	isLoading: boolean;
	error: string;
}

export class LoginPage extends React.Component<IProps, IState> {
	public state: IState = {
		isLoading: false,
		error: null,
	};

	private handleSubmit = async (output: IFormModelOutput) => {
		this.setState({
			error: null,
		});

		if (output.isValid) {
			this.setState({
				isLoading: true,
			});

			const result = await managers.auth.login(
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
				error: 'INVALID_DATA',
			});
		}
	};

	public render() {
		const { isLoading, error } = this.state;

		return (
			<Layout showHeader={false}>
				<Link to={PATHS.HOME} className={close}>
					<SvgIcon name={EIconName.Close} width="30px" height="30px" />
				</Link>

				<main className={root}>
					<Form
						className={formContainer}
						onSubmit={this.handleSubmit}
						validateOn={EFormValidateOn.SUBMIT}
					>
						<div className={form}>
							<h1 className={head}>Hello!</h1>

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
								<div className={errorBlock}>
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
									Sign in{' '}
								</Button>
							)}
						</div>
					</Form>
				</main>
			</Layout>
		);
	}
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

const close = css`
	position: absolute;
	top: 10px;
	left: 10px;
	z-index: 3;
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
  from {
    opacity: 0;
  }

	to {
    opacity: 1;
  }
`;

const head = css`
	color: ${COLORS.WHITE.toString()};
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
