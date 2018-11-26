import * as React from 'react';
import { Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { managers } from 'app/ts/managers';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { EApiRequestType } from 'app/ts/managers/ApiManager';
import { API_PATHS, PATHS } from 'app/ts/config';

interface IProps {}

interface IState {
	comments: IComment[];
}

interface IComment {
	id: number;
	text: string;
	children: IComment[];
}

const Comment = (props: { comment: IComment }) => {
	return (
		<div>
			id: {props.comment.id}
			text: {props.comment.text}
			<br />
			<div className={commentChildren}>
				{props.comment.children.map((item, i) => {
					return <Comment key={i} comment={item} />;
				})}
			</div>
		</div>
	);
};

export class Comments extends React.Component<IProps, IState> {
	public state: IState = {
		comments: [],
	};

	async componentDidMount() {
		const result = await managers.api.request<{ items: IComment[] }>(
			EApiRequestType.GET,
			API_PATHS.GET_COMMENTS,
			{},
		);

		if (result.data) {
			this.setState({
				comments: result.data.items,
			});
		}
	}

	public render() {
		return (
			<div>
				{this.state.comments.map((comment, i) => {
					return <Comment key={i} comment={comment} />;
				})}
			</div>
		);
	}
}

const root = css`
	padding: 10px;
`;

const commentChildren = css`
	margin-left: 10px;
`;
