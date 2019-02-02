import * as React from 'react';
import { EFormValidateOn, Form, IFormModelOutput } from '../forms/Form';
import { Input } from '../forms/Input';
import { FormError } from '../ui/FormError';
import { COLORS } from '../../theme';
import { Loader } from '../common/Loader';
import { Button, EButtonTheme } from '../ui/Button';
import { EIconName, SvgIcon } from '../ui/SvgIcon';
import { managers } from '../../managers';
import { AUTH_STYLES } from './styles';
import { ValidatorIsRequired } from '../forms/Validators/ValidatorIsRequired';
import { ValidatorMinLength } from '../forms/Validators/ValidatorMinLength';
import { Locale } from '../hocs/Locale';
import { EToastType } from '../../managers/ToastManager';
import { Success } from '../common/Success';
import { css } from 'emotion';
import { PATHS } from '../../config';
import { Link } from 'react-router-dom';

interface IProps {}

interface IState {
	isLoading: boolean;
	success: boolean;
}

export class PasswordResetConfirm extends React.Component<IProps, IState> {
	public state: IState = {
		isLoading: false,
		success: null,
	};

	public render() {
		const { isLoading, success } = this.state;

		return (
			<Form
				className={AUTH_STYLES.formContainer}
				onSubmit={this.handleSubmit}
				validateOn={EFormValidateOn.SUBMIT}
			>
				<div className={AUTH_STYLES.form}>
					<div className={AUTH_STYLES.logo} />

					<div className={AUTH_STYLES.head}>
						<h1>
							<Locale id="PASSWORD_RESET_CONFIRM.TITLE" />
						</h1>
						<h2>
							<Locale id="PASSWORD_RESET_CONFIRM.TEXT" />
						</h2>
					</div>

					{success && (
						<div className={AUTH_STYLES.success}>
							<Success />
						</div>
					)}

					{!success && (
						<div className={AUTH_STYLES.inputs}>
							<Input
								showError={false}
								containerClassName={AUTH_STYLES.input}
								name="newPassword"
								type="password"
								label="FORM_LABEL.NEW_PASSWORD"
								autoComplete="new-password"
								validators={[
									new ValidatorIsRequired(),
									new ValidatorMinLength(3),
								]}
							/>
						</div>
					)}
				</div>

				{!success && (
					<div className={AUTH_STYLES.buttons}>
						{isLoading ? (
							<Loader color={COLORS.WHITE} size={40} />
						) : (
							<Button
								className={AUTH_STYLES.button}
								theme={EButtonTheme.Round}
								type="submit"
								iconRight={
									<SvgIcon
										width={'30px'}
										height={'30px'}
										name={EIconName.ArrowForward}
									/>
								}
							>
								<Locale id="PASSWORD_RESET.SUBMIT" />
							</Button>
						)}
					</div>
				)}

				<div className={AUTH_STYLES.legals}>
					<Locale
						id="LEGALS_LINK"
						values={{ url: PATHS.TERMS }}
					/>
				</div>
			</Form>
		);
	}

	private handleSubmit = async (output: IFormModelOutput) => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');

		if (output.isValid) {
			this.setState({
				isLoading: true,
			});

			const result = await managers.auth.passwordResetConfirm(
				token,
				output.values.newPassword,
			);

			this.setState({
				isLoading: false,
			});

			if (!result.error && result.data) {
				this.setState({
					success: true,
				});

				setTimeout(() => {
					managers.auth.goAuth();
				}, 1500);
			} else {
				managers.toast.toast(EToastType.Error, managers.locale.t(result.error));
			}
		} else {
			managers.toast.toast(
				EToastType.Error,
				managers.locale.t('RESPONSE.INVALID_FORM_DATA'),
			);
		}
	};
}
