import * as React from 'react';
import { BrowserDetect } from 'app/ts/lib/BrowserDetect';
import { managers } from 'app/ts/managers';
import { API_PATHS } from 'app/ts/config';
import { IApiResult, IApiResultItem } from 'app/ts/managers/ApiManager';
import { css } from 'react-emotion';

interface IProps {
	enabled: boolean;
}

interface IState {
	status: EUploadStatus;
	files: FileList;
	progress: number;
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

const VALID_TYPES: string[] = ['video/mp4'];
const MAX_SIZE: number = 10 * 1024 * 1024 * 1024; // 10 MB

export class Upload extends React.PureComponent<IProps, IState> {
	constructor(props, context) {
		super(props, context);
	}

	private inputRef = React.createRef<HTMLInputElement>();
	private formRef = React.createRef<HTMLFormElement>();

	public state: IState = {
		status: EUploadStatus.Ready,
		files: null,
		progress: 0,
	};

	public static childContextTypes = {
		transitionGroup: () => {},
	};

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
			await this.upload();
		}
	};

	private resetStatus = () => {
		this.setState({
			status: EUploadStatus.Ready,
			files: null,
			progress: 0,
		});
	};

	private clear = () => {
		this.resetForm();
		this.resetStatus();
	};

	private wrap() {
		const { status, progress } = this.state;
		const { ...childProps } = this.props;
		const children: any = this.props.children;

		if (typeof children === 'function') {
			return children(
				status,
				progress,
				this.start,
				this.clear,
				this.selectFile,
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
			this.setState({
				status: EUploadStatus.Uploading,
			});

			const result = await managers.api.upload(
				API_PATHS.UPLOAD,
				this.state.files[0],
				(loaded: number, total: number, time: number) => {
					const progress = loaded / (total / 100);

					this.setState({
						progress,
					});
				},
			);

			return result;
		} else {
			return {
				data: null,
				error: 'No file',
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
