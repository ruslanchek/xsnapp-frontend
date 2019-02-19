import * as React from 'react';
import { ELayoutBackgroundColor, Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { API_PATHS, PATHS } from '../../config';
import { managers } from '../../managers';
import { ItemsStore } from '../../stores/ItemsStore';
import { EApiRequestType } from '../../managers/ApiManager';
import { Locale } from '../hocs/Locale';
import { Link } from 'react-router-dom';
import { Input } from '../forms/Input';
import { EFormValidateOn, Form } from '../forms/Form';
import { Button, EButtonTheme } from '../ui/Button';
import IItem = ItemsStore.IItem;
import { COLORS } from '../../theme';

interface IProps {
	routeParams: {
		itemId: string;
	};
}

interface IState {
	item: IItem;
	isLoaded: boolean;
}

export class UserItemsEditPage extends React.Component<IProps, IState> {
	public state: IState = {
		item: null,
		isLoaded: false,
	};

	public async componentDidMount() {
		const result = await managers.api.request<{ item: ItemsStore.IItem }>(
			EApiRequestType.GET,
			API_PATHS.GET_USER_ITEM.replace(':itemId', this.props.routeParams.itemId),
			{},
		);

		if (result.data) {
			const { item } = result.data;

			this.setState({
				item,
				isLoaded: true,
			});
		} else {
			managers.route.go(PATHS.NOT_FOUND, true);
		}
	}

	public render() {
		return (
			<Layout
				showFooter={false}
				showHeader={false}
				backLink={PATHS.USER_ITEMS}
				background={ELayoutBackgroundColor.Skyblue}
				topLink={
					<Link to={PATHS.UPLOAD_DO_UPLOAD}>
						<Locale id="UPLOADS.UPLOAD_NEW_VIDEO" />
					</Link>
				}
			>
				<div className={root}>{this.form}</div>
			</Layout>
		);
	}

	private get form() {
		const { item } = this.state;

		if(!item) {
			return null;
		}

		return (
			<Form validateOn={EFormValidateOn.SUBMIT} onSubmit={() => {}}>
				<div className={row}>
					<Input
						name="title"
						label={managers.locale.t('EDIT_ITEM.TITLE')}
						showError={false}
						value={item.title}
					/>
				</div>

				<div className={buttonsRow}>
					<Button type="submit" theme={EButtonTheme.Round} color={COLORS.SKYBLUE.toString()}>
						<Locale id="EDIT_ITEM.SAVE"/>
					</Button>
				</div>
			</Form>
		);
	}
}

const root = css`
	padding: 10px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;

const row = css`
	
`;

const buttonsRow = css`
	margin-top: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

//
// select {
// 	display: block;
// 	height: $height-input !important;
// 	background-color: $bg-input;
// 	border-color: $border-input !important;
// 	transition: background-color .2s, border-color .2s;
// 	border-radius: $border-radius-input !important;
// 	font-family: $font-family;
// 	font-size: $font-size-regular;
// 	color: $color-white;
// 	height: $height-input !important;
// 	padding: 0 $padding-input-side;
// 	-webkit-appearance:none;
// 	background: url('./expand.svg') no-repeat left top;
// 	background-size: 13px;
// 	background-position: calc(100% - 12px) 50%;
//
// &:hover {
// 		border-color: $border-input-hover !important;
// 	}
//
// &:focus {
// 		border-color: $border-input-focus !important;
// 	}
// }
