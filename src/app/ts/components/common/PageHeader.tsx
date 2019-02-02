import * as React from 'react';
import { Avatar } from '../ui/Avatar';
import { Utils } from '../../lib/Utils';
import { css } from 'emotion';
import { COLORS } from '../../theme';
import { followStore } from 'react-stores';
import { AuthStore } from '../../stores/AuthStore';

interface IProps {
	count: number;
	title: string | React.ReactNode;
}

interface IState {}

@followStore(AuthStore.store)
export class PageHeader extends React.Component<IProps, IState> {
	public static defaultProps: Partial<IProps> = {
		count: null,
		title: null,
	};

	public state: IState = {};

	public render() {
		const { count, title } = this.props;
		const { profile } = AuthStore.store.state;

		return (
			<div className={header}>
				<div className={user}>
					<Avatar
						username={profile.username}
						show={true}
						size={35}
						src={Utils.getAvatarPath(profile.id)}
					/>

					<div className={username}>{profile.username}</div>
				</div>

				<h1>
					{title}
					{count !== null && <i>{count}</i>}
				</h1>
			</div>
		);
	}
}

const user = css`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 10px;
`;

const username = css`
	margin-left: 10px;
`;

const header = css`
	background-image: linear-gradient(
			${COLORS.CYAN.alpha(0.25).toString()},
			${COLORS.CYAN.alpha(0).toString()}
		),
		url(${require('@img/illustrations/pattern.png')});

	background-repeat: repeat;
	background-size: 10%;
	padding: 10px 10px 5px;

	h1 {
		margin: 0;

		i {
			color: ${COLORS.WHITE.alpha(0.85).toString()};
			background-color: ${COLORS.SKYBLUE.alpha(0.3).toString()};
			padding: 0 10px 1px;
			border-radius: 3px;
			font-style: normal;
			margin: 0 10px;
		}
	}
`;
