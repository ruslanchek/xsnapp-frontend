import * as React from 'react';
import { Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { Upload, EUploadStatus } from '../ui/Upload';

interface IProps {}

interface IState {}

export class UploadPage extends React.Component<IProps, IState> {
	public state: IState = {};

	public render() {
		return (
			<Layout>
				<main className={root}>
					<Upload enabled={true}>
						{(
							status: EUploadStatus,
							progress: number,
							selectFile,
							start,
							cancel,
							clear,
						) => {
							return (
								<div>
									<p>
										<span onClick={selectFile}>Select file</span>
									</p>
									<p>status: {status}</p>
									<p>progress: {progress}</p>
									<p>
										<button
											onClick={() => {
												start();
											}}
										>
											start
										</button>
									</p>
									<p>
										<button
											onClick={() => {
												clear();
											}}
										>
											clear
										</button>
									</p>
									<p>
										<button
											onClick={() => {
												cancel();
											}}
										>
											cancel
										</button>
									</p>
								</div>
							);
						}}
					</Upload>
				</main>
			</Layout>
		);
	}
}

const root = css`
	padding: 15px;
`;

const input = css`
	margin-bottom: 15px;
`;
