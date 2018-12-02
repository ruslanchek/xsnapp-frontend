import * as React from 'react';
import { css } from 'react-emotion';
import { managers } from 'app/ts/managers';
import { EApiRequestType } from 'app/ts/managers/ApiManager';
import { API_PATHS } from 'app/ts/config';
import { Button } from '../ui/Button';
import { THEME, COLORS } from 'app/ts/theme';
import { followStore } from 'react-stores';
import { StateStore } from 'app/ts/stores/StateStore';
import { AuthStore } from 'app/ts/stores/AuthStore';
import { Loader } from '../common/Loader';

interface IProps {
	itemId: number;
}

interface IState {
	comments: IComment[];
	text: string;
	isLoadingForm: boolean;
	error: string;
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

@followStore(StateStore.store)
export class Comments extends React.Component<IProps, IState> {
	public state: IState = {
		comments: [],
		text: '',
		isLoadingForm: false,
		error: null,
	};

	componentDidMount() {
		this.loadComments();
	}

	private async loadComments() {
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

	private async postComment() {
		if (!this.state.text) {
			return this.setState({
				error: 'INVALID_DATA',
			});
		}

		this.setState({
			isLoadingForm: true,
			error: null,
		});

		const result = await managers.api.request<{ items: IComment[] }>(
			EApiRequestType.POST,
			API_PATHS.ADD_COMMENT,
			{
				text: this.state.text,
			},
		);

		this.setState({
			isLoadingForm: false,
		});

		if (!result.error && result.data) {
			this.setState({
				text: '',
			});

			this.loadComments();
		} else {
			this.setState({
				error: result.error,
			});
		}
	}

	public render() {
		const { isLoadingForm } = this.state;

		if (AuthStore.store.state.authorized) {
			return (
				<div className={root}>
					<form
						onSubmit={e => {
							e.preventDefault();
							this.postComment();
						}}
					>
						<textarea
							className={textInput}
							value={this.state.text}
							onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
								this.setState({
									text: event.target.value,
								});
							}}
						/>

						{isLoadingForm ? (
							<Loader size={32} />
						) : (
							<Button type={'submit'}>Submit</Button>
						)}
					</form>

					<div className={connents}>
						{this.state.comments.map((comment, i) => {
							return <Comment key={i} comment={comment} />;
						})}
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

const root = css`
	padding: 10px;
`;

const commentChildren = css`
	margin-left: 10px;
`;

const textInput = css`
	display: block;
	width: 100%;
	border-radius: 4px;
	height: 6em;
	padding: 10px;
	box-sizing: border-box;
	font-family: ${THEME.FONT};
	font-size: ${THEME.FONT_SIZE_REGULAR}px;
	line-height: 1.5em;
	background-color: ${COLORS.BLACK.toString()};
	border: none;
	outline: none;
	color: ${COLORS.GRAY_LIGHT.toString()};
	padding: 10px;
	margin-bottom: 10px;
`;

const connents = css`
	margin-top: 10px;
`;
