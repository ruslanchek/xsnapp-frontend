import * as React from 'react';
import { COLORS, THEME } from '../../theme';
import { FormContext, IFormContext } from './Form';
import { Validator } from './Validators/Validator';
import { InputErrors } from './InputErrors';
import styled, { css, cx } from 'react-emotion';

interface IProps {
	name: string;
	label: string;
	autoFocus?: boolean;
	value?: string;
	type?: string;
	icon?: string;
	autoComplete?: string;
	validators?: Validator[];
	inputClassName?: string;
	containerClassName?: string;
	onFocus?: (e) => void;
	onBlur?: (e) => void;
	onChange?: (e) => void;
	onKeyDown?: (e) => void;
}

interface IState {
	isFocused: boolean;
	value: string;
	animatedLabel: boolean;
}

export class Input extends React.PureComponent<IProps, {}> {
	public static defaultProps: Partial<IProps> = {
		validators: [],
		autoFocus: false,
		value: '',
		icon: '',
		type: 'text',
		name: '',
		label: '',
		inputClassName: '',
		containerClassName: '',
		onFocus: e => {},
		onBlur: e => {},
		onChange: e => {},
		onKeyDown: e => {},
	};

	public state: IState = {
		isFocused: false,
		value: '',
		animatedLabel: false,
	};

	private animatedLabelTimeout = null;
	private input = null;
	private formContext: IFormContext = null;

	public componentDidMount() {
		this.setValue(this.props.value);

		if (this.input.value) {
			this.setValue(this.input.value);
		}

		this.animatedLabelTimeout = setTimeout(() => {
			this.setState({
				animatedLabel: true,
			});
		}, 400);
	}

	public componentWillMount() {
		clearTimeout(this.animatedLabelTimeout);
	}

	public render() {
		const id = `input-${this.props.name}`;

		return (
			<FormContext.Consumer>
				{formContext => {
					this.formContext = formContext;

					return (
						<React.Fragment>
							<Label htmlFor={id} className={this.props.containerClassName}>
								<InputErrors inputName={this.props.name} />

								<Labels>
									{this.props.icon && (
										<Icon>
											<Ionicon
												icon={this.props.icon}
												fontSize="22px"
												color={COLORS.BLACK.toString()}
											/>
										</Icon>
									)}

									<LabelText
										isAnimated={this.state.animatedLabel}
										isIcon={!this.props.icon}
										isShowed={!this.state.isFocused && !this.state.value}
									>
										{this.props.label}
									</LabelText>
								</Labels>

								<input
									id={id}
									name={this.props.name}
									type={this.props.type}
									autoComplete={this.props.autoComplete}
									autoFocus={this.props.autoFocus}
									ref={ref => (this.input = ref)}
									className={cx(
										input,
										this.props.inputClassName,
										this.props.icon ? inputIcon : '',
									)}
									onFocus={e => {
										this.setState({
											isFocused: true,
										});
										this.props.onFocus(e);
									}}
									onBlur={e => {
										this.setState({
											isFocused: false,
										});
										this.props.onBlur(e);
									}}
									onChange={e => {
										this.setValue(e.target.value);
										this.props.onChange(e);
									}}
									onKeyDown={e => {
										this.setValue(this.input.value);
										this.props.onKeyDown(e);
									}}
								/>
							</Label>
						</React.Fragment>
					);
				}}
			</FormContext.Consumer>
		);
	}

	private setValue(value: string): void {
		this.setState({
			value,
		});

		this.input.value = value;
		this.formContext.setValue(this.props.name, {
			value,
			validators: this.props.validators,
		});
	}
}

interface IIconText {
	isShowed: boolean;
	isIcon: boolean;
	isAnimated: boolean;
}

const input = css`
	width: 100%;
	background-color: transparent;
	padding: 0;
	outline: none;
	height: ${THEME.INPUT_HEIGHT}px;
	line-height: ${THEME.INPUT_HEIGHT}px;
	font-size: ${THEME.FONT_SIZE_BIG}px;
	border: none;
	border-bottom: 2px solid ${COLORS.WHITE.alpha(0.5).toString()};
	font-weight: 600;
	color: ${COLORS.WHITE.toString()};
	transition: border-color 0.2s;
	box-sizing: border-box;
	font-weight: 600;

	&:focus {
		border-color: ${COLORS.WHITE.alpha(1).toString()};
	}
`;

const inputIcon = css`
	padding-left: ${THEME.INPUT_HEIGHT}px;
`;

const Label = styled('label')`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	height: ${THEME.INPUT_HEIGHT}px;
	font-size: ${THEME.FONT_SIZE_BIG}px;
	color: ${COLORS.WHITE.alpha(0.5).toString()};
	top: 0;
	left: 0;
`;

const Labels = styled('div')`
	pointer-events: none;
	user-select: none;
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const Icon = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${THEME.INPUT_HEIGHT}px;
`;

const LabelText = styled('span')<IIconText>`
	transition: ${(props: IIconText) =>
		props.isAnimated ? 'transform .2s, opacity .2s' : ''};
	opacity: ${(props: IIconText) => (props.isShowed ? 1 : 0)};
	transform: ${(props: IIconText) =>
		props.isShowed ? 'scale(1)' : 'scale(.8)'};
	height: ${THEME.INPUT_HEIGHT}px;
	line-height: ${THEME.INPUT_HEIGHT}px;
	font-size: ${THEME.FONT_SIZE_BIG}px;
	white-space: nowrap;
	color: ${COLORS.WHITE.alpha(0.5).toString()};
	font-weight: 600;
`;
