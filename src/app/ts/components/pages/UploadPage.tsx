import * as React from 'react';
import { followStore } from 'react-stores';
import { managers } from 'app/ts/managers';
import { EApiRequestType } from 'app/ts/managers/ApiManager';
import { API_PATHS, CONFIG, PATHS } from 'app/ts/config';
import { Layout } from '../common/Layout';
import { ItemsStore } from 'app/ts/stores/ItemsStore';
import { Item } from '../ui/Item';
import { css } from 'react-emotion';
import { Form, EFormValidateOn, IFormModelOutput } from '../forms/Form';
import { Input } from '../forms/Input';
import { ValidatorIsEmail } from '../forms/Validators/ValidatorIsEmail';
import { Validator } from '../forms/Validators/Validator';
import { ValidatorIsRequired } from '../forms/Validators/ValidatorIsRequired';
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
