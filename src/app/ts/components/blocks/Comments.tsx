import * as React from 'react';
import * as dayjs from 'dayjs';
import { css } from 'react-emotion';
import { managers } from 'app/ts/managers';
import { EApiRequestType } from 'app/ts/managers/ApiManager';
import { API_PATHS } from 'app/ts/config';
import { Button, EButtonTheme } from '../ui/Button';
import { THEME, COLORS } from 'app/ts/theme';
import { followStore } from 'react-stores';
import { StateStore } from 'app/ts/stores/StateStore';
import { AuthStore } from 'app/ts/stores/AuthStore';
import { Loader } from '../ui/Loader';
import { Modal } from '../modals/Modal';
import { Avatar } from '../ui/Avatar';

interface IProps {
	itemId: number;
}

interface IState {
	comments: IComment[];
	text: string;
	isLoadingForm: boolean;
	isLoadingList: boolean;
	error: string;
	parentId: number;
	isModalOpened: boolean;
}

interface IComment {
	id: number;
	text: string;
	date: Date;
	children: IComment[];
}

const Comment = (props: {
	comment: IComment;
	onReply: (commentId: number) => void;
}) => {
	const { comment, onReply } = props;
	const { id, text, date } = comment;

	// very strange shit with the date and time...
	// Server send it with TZ but its 2 hour earlir :-(

	return (
		<div className={commentBlock}>
			<div className={commentAvatar}>
				<Avatar
					username="default"
					size={26}
					show={true}
					src="https://d15hjmscxdyus1.cloudfront.net/avatars/1/avatar.image"
				/>
			</div>

			<div className={commentContent}>
				<div className={commentTitle}>
					username &bull; {dayjs(new Date()).diff(dayjs(date), 'hour')} h
				</div>

				<div>{text}</div>

				<div className={commentSettings}>
					<span
						onClick={() => {
							onReply(id);
						}}
					>
						Reply
					</span>
				</div>
			</div>

			{/* <div className={commentChildren}>
				{props.comment.children.map((item, i) => {
					return <Comment key={i} comment={item} />;
				})}
			</div> */}
		</div>
	);
};

const commentBlock = css`
	border-bottom: 1px solid ${COLORS.BLACK.toString()};
	padding: 10px;
	display: flex;
	justify-content: flex-start;
`;

const commentAvatar = css``;

const commentContent = css`
	padding-left: 10px;
`;

const commentTitle = css`
	color: ${COLORS.GRAY.toString()};
	margin-bottom: 3px;
	font-weight: 600;
`;

const commentSettings = css`
	font-weight: 600;
	margin-top: 5px;
	color: ${COLORS.GRAY.toString()};
`;

@followStore(StateStore.store)
export class Comments extends React.Component<IProps, IState> {
	public state: IState = {
		comments: [],
		text: '',
		isLoadingForm: false,
		isLoadingList: false,
		error: null,
		parentId: 0,
		isModalOpened: false,
	};

	componentDidMount() {
		this.loadComments();
	}

	private async loadComments() {
		this.setState({
			isLoadingList: true,
		});

		const { itemId } = this.props;

		const result = await managers.api.request<{ items: IComment[] }>(
			EApiRequestType.GET,
			API_PATHS.GET_COMMENTS.replace(':itemId', itemId.toString()),
		);

		if (result.data) {
			this.setState({
				comments: result.data.items,
			});
		}

		this.setState({
			isLoadingList: false,
		});
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

		const { parentId, text } = this.state;
		const { itemId } = this.props;

		const result = await managers.api.request<{ items: IComment[] }>(
			EApiRequestType.POST,
			API_PATHS.ADD_COMMENT,
			{
				text,
				parentId,
				itemId,
			},
		);

		this.setState({
			isLoadingForm: false,
		});

		if (!result.error && result.data) {
			this.setState({
				text: '',
				isModalOpened: false,
				parentId: 0,
			});

			this.loadComments();
		} else {
			this.setState({
				error: result.error,
			});
		}
	}

	private handleModalOnClose = () => {
		this.setState({
			parentId: 0,
			isModalOpened: false,
		});
	};

	public render() {
		const { isLoadingForm, isModalOpened } = this.state;

		if (AuthStore.store.state.authorized) {
			return (
				<div className={root}>
					<div className={connents}>
						{this.state.comments.map((comment, i) => {
							return (
								<Comment
									key={i}
									comment={comment}
									onReply={(commentId: number) => {
										this.setState({
											parentId: commentId,
											isModalOpened: true,
										});
									}}
								/>
							);
						})}
					</div>

					<Modal isVisible={isModalOpened} onClose={this.handleModalOnClose}>
						<form
							onSubmit={e => {
								e.preventDefault();
								this.postComment();
							}}
						>
							<h2 className={modalHeader}>Reply comment</h2>
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
								<Button theme={EButtonTheme.Round} type={'submit'}>
									Submit
								</Button>
							)}
						</form>
					</Modal>
				</div>
			);
		} else {
			return null;
		}
	}
}

const root = css``;

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

const modalHeader = css`
	font-size: ${THEME.FONT_SIZE_MEDIUM}px;
	text-align: center;
	padding: 10px;
	margin: 0;
`;
