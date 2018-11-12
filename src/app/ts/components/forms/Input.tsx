import * as React from 'react';
import * as Ionicon from 'react-ionicons';
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
	validators?: Validator[];
	className?: string;
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
		className: '',
		onFocus: (e) => {},
		onBlur: (e) => {},
		onChange: (e) => {},
		onKeyDown: (e) => {},
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
		if(this.props.value) {
			this.setValue(this.props.value);
		}

		if(this.input.value) {
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
		return (
			<FormContext.Consumer>
				{(formContext) => {
					this.formContext = formContext;

					return (
						<React.Fragment>
							<Label htmlFor="search">
								<InputErrors inputName={this.props.name}/>

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
									name={this.props.name}
									type={this.props.type}
									autoFocus={this.props.autoFocus}
									ref={(ref) => this.input = ref}
									className={cx(input, this.props.className, this.props.icon ? inputIcon : '')}
									onFocus={(e) => {
										this.setState({
											isFocused: true,
										});
										this.props.onFocus(e);
									}}
									onBlur={(e) => {
										this.setState({
											isFocused: false,
										});
										this.props.onBlur(e);
									}}
									onChange={(e) => {
										this.setValue(e.target.value);
										this.props.onChange(e);
									}}
									onKeyDown={(e) => {
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
	background-color: ${COLORS.WHITE.toString()};
	padding: 0 ${THEME.SECTION_PADDING_H / 2}px;
	outline: none;
	border-radius: 4px;
	height: ${THEME.INPUT_HEIGHT}px;
	line-height: ${THEME.INPUT_HEIGHT}px;
	font-size: ${THEME.FONT_SIZE_REGULAR}px;
	border: 1px solid ${COLORS.GRAY_DARK.darken(.05).toString()};
	font-weight: 600;
	color: ${COLORS.BLACK.toString()};
	transition: border-color .2s;
	box-sizing: border-box;

	&:hover {
		border-color: ${COLORS.GRAY_DARK.darken(.1).toString()};
	}

	&:focus {
		border-color: ${COLORS.GRAY_DARK.darken(.15).toString()};
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
	font-size: ${THEME.FONT_SIZE_REGULAR}px;
	color: ${COLORS.BLACK_EXTRA_LIGHT.toString()};
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
	transition: ${(props: IIconText) => props.isAnimated ? 'transform .2s, opacity .2s' : ''};
	opacity: ${(props: IIconText) => props.isShowed ? 1 : 0};
	transform: ${(props: IIconText) => props.isShowed ? 'scale(1)' : 'scale(.8)'};
	height: ${THEME.INPUT_HEIGHT}px;
	line-height: ${THEME.INPUT_HEIGHT}px;
	font-size: ${THEME.FONT_SIZE_REGULAR}px;
	white-space: nowrap;
	margin-left: ${(props: IIconText) => props.isIcon ? `${THEME.SECTION_PADDING_H / 2}px` : 0};
`;
