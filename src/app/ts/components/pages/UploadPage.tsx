import * as React from 'react';
import { Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { Upload, EUploadStatus } from '../ui/Upload';
import { ProgressCircle } from '../ui/ProgressCircle';
import { COLORS, THEME } from 'app/ts/theme';
import { Surface } from '../common/Surface';
import { distanceInWords } from 'date-fns';
import { CONFIG } from 'app/ts/config';

interface IProps {}

interface IState {}

const CIRCLE_SIZE = 90;

export class UploadPage extends React.Component<IProps, IState> {
	public state: IState = {};

	public render() {
		return (
			<Layout showHeader={false} showFooter={true}>
				<main className={root}>
					<Upload enabled={true}>
						{(
							status: EUploadStatus,
							progress: number,
							loadedBytes,
							totalBytes,
							eta,
							selectFile,
							start,
							cancel,
							clear,
						) => {
							const percent = Math.ceil(progress);

							return (
								<Surface>
									<div className={progressCn}>
										<div className={valueCn}>{percent}%</div>

										<ProgressCircle
											className={progressCircleCn}
											size={CIRCLE_SIZE - 4}
											percent={percent}
											strokeWidth={2}
											meterColor={COLORS.GRAY.alpha(0.3).toString()}
											valueColor={COLORS.GREEN.toString()}
										/>
									</div>

									<p>
										<span onClick={selectFile}>Select file</span>
									</p>
									<p>status: {status}</p>
									<p>progress: {progress}</p>
									<p>loadedBytes: {loadedBytes}</p>
									<p>totalBytes: {totalBytes}</p>
									<p>eta: {eta}</p>

									{eta > 0 && (
										<p>
											eta words:{' '}
											{distanceInWords(new Date(Date.now() + eta), new Date(), {
												includeSeconds: true,
											})}
										</p>
									)}

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
								</Surface>
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

const uploadArea = css``;

const progressCircleCn = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const progressCn = css`
	position: relative;
	height: ${CIRCLE_SIZE}px;
	width: ${CIRCLE_SIZE}px;
`;

const valueCn = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-weight: 800px;
	font-size: ${THEME.FONT_SIZE_MEDIUM}px;
`;
