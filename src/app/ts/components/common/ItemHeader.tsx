import * as React from 'react';
import { css } from 'react-emotion';
import { COLORS, THEME } from 'app/ts/theme';
import { Avatar } from '../ui/Avatar';
import { Utils } from 'app/ts/lib/Utils';
import { SvgIcon, EIconName } from '../ui/SvgIcon';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { Link } from 'react-router-dom';
import { PATHS } from 'app/ts/config';

interface IProps {
	user: ItemsStore.IItemUser;
	isVisible: boolean;
	views: number;
	title: string;
	itemId: number;
}

interface IState {}

export class ItemHeader extends React.PureComponent<IProps, IState> {
	public state: IState = {};

	public render() {
		const { user, isVisible, views, title, itemId } = this.props;

		return (
			<div className={header}>
				<div className={ava}>
					<Avatar
						username={user.username}
						show={isVisible}
						size={45}
						src={Utils.getAvatarPath(user.id)}
					/>
				</div>

				<div className={titleBlock}>
					<div className={titleTop}>
						<Link to={PATHS.ITEM.replace(':itemId', String(itemId))}>
							<header className={head}>{title}</header>
						</Link>
						<SvgIcon
							name={EIconName.More}
							className={more}
							width="24px"
							height="24px"
						/>
					</div>

					<div className={titleBottom}>
						<span className={username}>{user.username}</span>

						{isVisible && (
							<div className={viewsBlock}>
								<span className="count">{views}</span>
								<SvgIcon name={EIconName.Eye} />
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const head = css`
	margin: 0;
	font-weight: 800;
	font-size: ${THEME.FONT_SIZE_MEDIUM}px;
	color: ${COLORS.GRAY_LIGHT.toString()};
`;

const titleTop = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const titleBottom = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const username = css`
	color: ${COLORS.GRAY.toString()};
`;

const header = css`
	display: flex;
	padding: 10px;
	justify-content: space-between;
	align-items: flex-start;
`;

const titleBlock = css`
	flex-grow: 1;
`;

const ava = css`
	margin-right: 10px;
`;

const viewsBlock = css`
	font-weight: 800;
	color: ${COLORS.GRAY.toString()};
	display: flex;
	align-items: center;
	margin-left: 3px;

	.count {
		margin-right: 0.6ex;
	}
`;

const more = css`
	margin-left: 10px;
	margin-right: -3px;
`;
