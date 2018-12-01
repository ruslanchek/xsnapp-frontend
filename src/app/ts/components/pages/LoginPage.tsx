import * as React from 'react';
import { managers } from 'app/ts/managers';
import { PATHS } from 'app/ts/config';
import { Layout } from '../common/Layout';
import { css, keyframes, cx } from 'react-emotion';
import { Form, EFormValidateOn, IFormModelOutput } from '../forms/Form';
import { Input } from '../forms/Input';
import { ValidatorIsEmail } from '../forms/Validators/ValidatorIsEmail';
import { ValidatorIsRequired } from '../forms/Validators/ValidatorIsRequired';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { THEME, COLORS, COMMON_STYLES } from 'app/ts/theme';
import { SvgIcon, EIconName } from '../ui/SvgIcon';

interface IProps {}

interface IState {}

export class LoginPage extends React.Component<IProps, IState> {
	public state: IState = {};

	private handleSubmit = async (output: IFormModelOutput) => {
		if (output.isValid) {
			const result = await managers.auth.login(
				output.values.email,
				output.values.password,
			);

			if (!result.error && result.data) {
				managers.route.go(PATHS.HOME);
			}
		}
	};

	public render() {
		return (
			<Layout showHeader={false}>
				<Link to={PATHS.HOME} className={close}>
					<SvgIcon name={EIconName.Close} width="30px" height="30px" />
				</Link>
				<video
					className={bg}
					src={require('../../../video/bg/bg.mov')}
					autoPlay
					muted
					loop
					controls={false}
					playsInline
				/>
				<main className={root}>
					<Form
						className={formContainer}
						onSubmit={this.handleSubmit}
						validateOn={EFormValidateOn.SUBMIT}
					>
						<div className={form}>
							<h1>Hello!</h1>
							<Input
								containerClassName={input}
								name="email"
								label="E-mail"
								autoComplete="username"
								validators={[new ValidatorIsEmail()]}
							/>

							<Input
								containerClassName={input}
								name="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								validators={[new ValidatorIsRequired()]}
							/>
						</div>

						<div className={buttons}>
							<Link
								className={cx(COMMON_STYLES.LINK_WHITE, COMMON_STYLES.BOLD)}
								to={'#'}
							>
								Forgot your password?
							</Link>

							<Button
								type="submit"
								iconLeft={
									<SvgIcon
										width={'30px'}
										height={'30px'}
										name={EIconName.ArrowForward}
									/>
								}
							>
								Next{' '}
							</Button>
						</div>
					</Form>
				</main>
			</Layout>
		);
	}
}

const form = css``;

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
`;

const close = css`
	position: absolute;
	top: 10px;
	left: 10px;
	z-index: 3;
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

const bg = css`
	display: block;
	object-fit: cover;
	z-index: 1;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	animation: ${fadeIn} 5s;
`;
