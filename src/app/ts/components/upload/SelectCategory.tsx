import * as React from 'react';
import { css } from 'emotion';
import { ItemsStore } from '../../stores/ItemsStore';
import { managers } from '../../managers';
import { COLORS, THEME } from '../../theme';
import { EIconName, SvgIcon } from '../ui/SvgIcon';
import { Locale } from '../hocs/Locale';

interface IProps {}

interface IState {
	currentCategory: ItemsStore.ICategory;
	categories: ItemsStore.ICategory[];
}

export class SelectCategory extends React.PureComponent<IProps, IState> {
	public static defaultProps: Partial<IProps> = {};

	public state: IState = {
		categories: [],
		currentCategory: null,
	};

	public async componentDidMount() {
		const result = await managers.categories.fetchItems();

		this.setState({
			categories: result,
		});
	}

	public render() {
		const { categories, currentCategory } = this.state;

		return (
			<div className={root}>
				<div className={current}>
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

				<div className={list}>
					{categories.map((item, key) => {
						return (
							<div key={key} onClick={this.handleItemSelect.bind(this, item)}>
								<img
									src={`https://picsum.photos/200/200?i=${key}`}
									alt={item.id.toString()}
								/>
								<span>{item.title}</span>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	private handleItemSelect(category: ItemsStore.ICategory): void {
		this.setState({
			currentCategory: category,
		});
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
`;

const arrowIcon = css``;

const placeholder = css`
	color: ${COLORS.WHITE.alpha(0.65).toString()};
`;

const list = css`
	display: flex;

	> div {
		> img {
			width: 40px;
			height: 40px;
		}
	}
`;
