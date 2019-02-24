import * as React from 'react';
import { css, cx } from 'emotion';
import { ItemsStore } from '../../stores/ItemsStore';
import { managers } from '../../managers';
import { COLORS, THEME } from '../../theme';
import { EIconName, SvgIcon } from '../ui/SvgIcon';
import { Locale } from '../hocs/Locale';
import { Modal } from '../modals/Modal';
import { Picture } from '../ui/Picture';
import { FormContext, IFormContext } from '../forms/Form';

interface IProps {
	value: number;
	name: string;
}

interface IState {
	currentCategory: ItemsStore.ICategory;
	categories: ItemsStore.ICategory[];
	isVisible: boolean;
	value: number;
}

export class SelectCategory extends React.PureComponent<IProps, IState> {
	public static defaultProps: Partial<IProps> = {};

	public state: IState = {
		categories: [],
		currentCategory: null,
		isVisible: false,
		value: null,
	};

	private formContext: IFormContext = null;

	public async componentDidMount() {
		const result = await managers.categories.fetchItems();
		const currentCategory = result.find(
			category => category.id === this.props.value,
		);

		this.setState({
			categories: result,
			currentCategory,
		});
	}

	public render() {
		const { categories, currentCategory } = this.state;

		return (
			<FormContext.Consumer>
				{formContext => {
					this.formContext = formContext;

					return (
						<div className={root}>
							<div className={current} onClick={this.handleClickCurrent}>
								{currentCategory ? (
									currentCategory.title
								) : (
									<span className={placeholder}>
										<Locale id="CATEGORIES.SELECT_CATEGORY" />
									</span>
								)}

								<SvgIcon
									className={arrowIcon}
									width={'30px'}
									height={'30px'}
									name={EIconName.AddBox}
								/>
							</div>

							<Modal isVisible={this.state.isVisible}>
								<div className={list}>
									{categories.map((item, key) => {
										return (
											<div
												key={key}
												className={cx(
													itemCn,
													currentCategory && currentCategory.id === item.id
														? 'selected'
														: '',
												)}
												onClick={this.handleItemSelect.bind(this, item)}
											>
												<Picture
													className={imageCn}
													src={`https://picsum.photos/200/200?i=${key}`}
													size={40}
												/>
												<span>{item.title}</span>
											</div>
										);
									})}
								</div>
							</Modal>
						</div>
					);
				}}
			</FormContext.Consumer>
		);
	}

	private setValue(value: number): void {
		this.setState({
			value,
		});

		this.formContext.setValue(this.props.name, {
			value,
			validators: [],
		});
	}

	private handleClickCurrent = (event: React.MouseEvent) => {
		this.setState({
			isVisible: true,
		});
	};

	private handleItemSelect(category: ItemsStore.ICategory): void {
		this.setState(
			{
				currentCategory: category,
			},
			() => {
				this.setState({
					isVisible: false,
				});
			},
		);

		this.setValue(category.id);
	}
}

const root = css``;

const current = css`
	width: 100%;
	background-color: transparent;
	padding: 0;
	outline: none;
	height: ${THEME.INPUT_HEIGHT}px;
	line-height: ${THEME.INPUT_HEIGHT}px;
	font-size: ${THEME.FONT_SIZE_BIG}px;
	border: none;
	border-radius: 0;
	border-bottom: 2px solid ${COLORS.WHITE.alpha(0.5).toString()};
	font-weight: 600;
	color: ${COLORS.WHITE.toString()};
	transition: border-color 0.2s;
	box-sizing: border-box;
	position: relative;
`;

const imageCn = css`
	margin-right: 20px;
`;

const arrowIcon = css`
	right: 0;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
`;

const placeholder = css`
	color: ${COLORS.WHITE.alpha(0.65).toString()};
`;

const list = css`
	background-color: ${COLORS.BLACK.toString()};
	box-sizing: border-box;
	border-radius: 5px;
	box-shadow: 0 5px 15px ${COLORS.BLACK.alpha(0.5).toString()};
`;

const itemCn = css`
	padding: 10px 15px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 1px solid ${COLORS.BLACK_EXTRA_LIGHT.toString()};
	font-size: ${THEME.FONT_SIZE_REGULAR}px;
	font-weight: 800;

	&.selected {
		background-color: ${COLORS.BLUE_SELECTED.toString()};
	}
`;
