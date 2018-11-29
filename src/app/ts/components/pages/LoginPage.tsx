import * as React from 'react';
import { managers } from 'app/ts/managers';
import { PATHS } from 'app/ts/config';
import { Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { Form, EFormValidateOn, IFormModelOutput } from '../forms/Form';
import { Input } from '../forms/Input';
import { ValidatorIsEmail } from '../forms/Validators/ValidatorIsEmail';
import { ValidatorIsRequired } from '../forms/Validators/ValidatorIsRequired';

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
						onSubmit={this.handleSubmit}
						validateOn={EFormValidateOn.SUBMIT}
					>
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

						<button type="submit">SUBMIT</button>
					</Form>
				</main>
			</Layout>
		);
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
`;

const input = css`
	margin-bottom: 15px;
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
`;
