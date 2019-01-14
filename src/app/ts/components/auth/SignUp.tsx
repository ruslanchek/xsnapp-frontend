import * as React from 'react';
import { EFormValidateOn, Form, IFormModelOutput } from '../forms/Form';
import { Input } from '../forms/Input';
import { ValidatorIsEmail } from '../forms/Validators/ValidatorIsEmail';
import { ValidatorIsRequired } from '../forms/Validators/ValidatorIsRequired';
import { FormError } from '../ui/FormError';
import { COLORS } from '../../theme';
import { Loader } from '../common/Loader';
import { Button, EButtonTheme } from '../ui/Button';
import { EIconName, SvgIcon } from '../ui/SvgIcon';
import { managers } from '../../managers';
import { AUTH_STYLES } from './styles';
import { ValidatorMinLength } from '../forms/Validators/ValidatorMinLength';

interface IProps {}

interface IState {
	isLoading: boolean;
	error: string;
}

export class SignUp extends React.Component<IProps, IState> {
	public state: IState = {
		isLoading: false,
		error: null,
	};

	public render() {
		const { isLoading, error } = this.state;

		return (
			<Form
				className={AUTH_STYLES.formContainer}
				onSubmit={this.handleSubmit}
				validateOn={EFormValidateOn.SUBMIT}
			>
				<div className={AUTH_STYLES.form}>
					<div className={AUTH_STYLES.logo} />

					<div className={AUTH_STYLES.head}>
						<h1>SIGN_UP::TITLE</h1>
						<h2>SIGN_UP::TEXT</h2>
					</div>

					<div className={AUTH_STYLES.inputs}>
						<Input
							showError={false}
							containerClassName={AUTH_STYLES.input}
							name="email"
							label="FORM_LABEL::EMAIL"
							autoComplete="username"
							validators={[new ValidatorIsEmail()]}
						/>

						<Input
							showError={false}
							containerClassName={AUTH_STYLES.input}
							name="password"
							label="FORM_LABEL::PASSWORD"
							type="password"
							autoComplete="new-password"
							validators={[
								new ValidatorIsRequired(),
								new ValidatorMinLength(3),
							]}
						/>
						<div
							className={AUTH_STYLES.errorBlock}
							onClick={this.handleClearErrors}
						>
							<FormError errors={[error]} />
						</div>
					</div>
				</div>

				<div className={AUTH_STYLES.buttons}>
					<div />

					{isLoading ? (
						<Loader color={COLORS.WHITE} size={40} />
					) : (
						<Button
							className={AUTH_STYLES.button}
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
							SIGN_UP::SUBMIT
						</Button>
					)}
				</div>

				<div className={AUTH_STYLES.legals}>SIGN_UP::LEGALS</div>
			</Form>
		);
	}

	private handleClearErrors = () => {
		this.setState({
			error: null,
		});
	};

	private handleSubmit = async (output: IFormModelOutput) => {
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
				error: 'RESPONSE::INVALID_FORM_DATA',
			});
		}
	};
}