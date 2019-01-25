import * as React from 'react';
import axios from 'axios';
import { managers } from 'app/ts/managers';
import { API_PATHS, CONFIG } from 'app/ts/config';
import { IApiResult, IApiResultItem } from 'app/ts/managers/ApiManager';
import { css } from 'react-emotion';

interface IProps {
	enabled: boolean;
}

interface IState {
	status: EUploadStatus;
	files: FileList;
	progress: number;
	eta: number;
	startTime: number;
	totalBytes: number;
	loadedBytes: number;
}

export enum EUploadStatus {
	Ready,
	FileSelected,
	Uploading,
	Error,
	Done,
}

const DISABLED_INPUT_STATUSES = [
	EUploadStatus.FileSelected,
	EUploadStatus.Uploading,
	EUploadStatus.Done,
];

const VALID_TYPES: string[] = [
	'video/mp4',
	'video/quicktime',
	'video/3gpp2',
	'video/x-m4v',
	'video/webm',
];

const MAX_SIZE: number = 10 * 1024 * 1024 * 1024; // 10 GB

export class UploadController extends React.PureComponent<IProps, IState> {
	public static childContextTypes = {
		transitionGroup: () => {},
	};

	public state: IState = {
		status: EUploadStatus.Ready,
		files: null,
		progress: 0,
		eta: 0,
		startTime: 0,
		totalBytes: 0,
		loadedBytes: 0,
	};

	private inputRef = React.createRef<HTMLInputElement>();
	private formRef = React.createRef<HTMLFormElement>();
	private cancelToken = null;

	constructor(props, context) {
		super(props, context);
	}

	public getChildContext() {
		return { transitionGroup: null };
	}

	public render() {
		return (
			<>
				<form className={form} ref={this.formRef}>
					<input
						className={form}
						type="file"
						multiple={false}
						ref={this.inputRef}
						accept={VALID_TYPES.join(',')}
						onChange={e => {
							if (
								e.target.files &&
								e.target.files[0] &&
								this.checkFile(e.target.files[0])
							) {
								this.setState(
									{
										progress: 0,
										files: e.target.files,
										status: EUploadStatus.FileSelected,
										startTime: 0,
										totalBytes: e.target.files[0].size,
										loadedBytes: 0,
									},
									async () => {},
								);
							}
						}}
					/>
				</form>

				<div className={container}>{this.wrap()}</div>
			</>
		);
	}

	private calculateEta(loaded: number, total: number): number {
		const now = Date.now();
		const elapsedtime = now - this.state.startTime;

		return (total / loaded) * elapsedtime - elapsedtime;
	}

	private selectFile = () => {
		if (
			!this.props.enabled ||
			DISABLED_INPUT_STATUSES.includes(this.state.status)
		) {
			return;
		}

		this.inputRef.current.click();
	};

	private start = async () => {
		if (this.state.status === EUploadStatus.FileSelected) {
			try {
				await this.upload();
			} catch (e) {
				console.log(e);
			}
		}
	};

	private cancel = async () => {
		if (this.cancelToken && this.state.status === EUploadStatus.Uploading) {
			await this.cancelToken.cancel('Operation canceled by the user.');
		}

		this.clear();
	};

	private resetStatus = () => {
		this.setState({
			status: EUploadStatus.Ready,
			files: null,
			progress: 0,
			startTime: 0,
			totalBytes: 0,
			loadedBytes: 0,
		});
	};

	private clear = () => {
		this.resetForm();
		this.resetStatus();
	};

	private wrap() {
		const {
			status,
			progress,
			loadedBytes,
			totalBytes,
			eta,
			files,
		} = this.state;
		const { ...childProps } = this.props;
		const children: any = this.props.children;

		if (typeof children === 'function') {
			return children(
				files,
				status,
				progress,
				loadedBytes,
				totalBytes,
				eta,
				this.selectFile,
				this.start,
				this.cancel,
				this.clear,
				childProps,
			);
		}

		const child = React.Children.only(children);
		return React.cloneElement(child, childProps);
	}

	private checkFile(file: File): boolean {
		if (VALID_TYPES.indexOf(file.type) < 0) {
			return false;
		}

		if (file.size > MAX_SIZE) {
			return false;
		}

		return true;
	}

	private resetForm = (): void => {
		this.formRef.current.reset();
	};

	private async upload(): Promise<IApiResult<IApiResultItem<any>>> {
		if (this.state.files && this.state.files.length > 0) {
			const file = this.state.files[0];

			this.setState({
				status: EUploadStatus.Uploading,
				startTime: Date.now(),
			});

			const formData = new FormData();
			const url: string = `${CONFIG.API_BASE_URL}${API_PATHS.UPLOAD}`;
			let token: string = managers.storage.cookies.get('token');

			token = token ? `Bearer ${token}` : '';

			formData.append('file', file);

			this.cancelToken = axios.CancelToken.source();

			const result = await axios.post(url, formData, {
				cancelToken: this.cancelToken.token,
				headers: {
					Authorization: token,
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: progressEvent => {
					const { loaded, total } = progressEvent;
					const progress = progressEvent.loaded / (progressEvent.total / 100);
					const eta = this.calculateEta(loaded, total);

					this.setState({
						progress,
						eta,
						loadedBytes: loaded,
						totalBytes: total,
					});
				},
			});

			if (result && result.data) {
				return result.data;
			} else {
				return {
					data: null,
					error: null,
				};
			}
		} else {
			return {
				data: null,
				error: 'NO_FILE',
			};
		}
	}
}

const container = css``;

const form = css`
	width: 0;
	height: 0;
	position: absolute;
	visibility: hidden;
	display: block;
	z-index: -1;
`;
