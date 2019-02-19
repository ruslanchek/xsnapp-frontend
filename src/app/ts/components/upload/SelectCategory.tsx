import * as React from 'react';
import { css } from 'emotion';
import { ItemsStore } from '../../stores/ItemsStore';
import { managers } from '../../managers';

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
					{currentCategory ? currentCategory.title : null}
				</div>

				<div className={list}>
					{categories.map((item, key) => {
						return (
							<div key={key} onClick={this.handleItemSelect.bind(this, item)}>
								<img src={`https://picsum.photos/200/200?i=${key}`} alt={item.id.toString()} />
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

const current = css``;

const list = css`
	display: flex;

	> div {
		> img {
			width: 40px;
			height: 40px;
		}
	}
`;
