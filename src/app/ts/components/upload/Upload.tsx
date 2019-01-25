import * as React from 'react';
import { css, cx, keyframes } from 'react-emotion';
import { EUploadStatus, UploadController } from './UploadController';
import { ProgressCircle } from '../ui/ProgressCircle';
import { COLORS, THEME } from 'app/ts/theme';
import { Button, EButtonTheme } from '../ui/Button';
import { UPLOAD_STYLES } from './styles';
import { CSSTransition } from 'react-transition-group';
import { CropFileName } from '../common/CropFileName';
import { CONFIG } from '../../config';
import { distanceInWords } from 'date-fns';
import * as prettyBytes from 'pretty-bytes';
import { Locale } from '../hocs/Locale';

interface IProps {}

interface IState {}

const CIRCLE_SIZE = 140;
const ANIMATION_TIME = 1000;

export class Upload extends React.Component<IProps, IState> {
	public state: IState = {};

	public componentDidMount(): void {
		window.onbeforeunload = () => {
			return 'Are you sure you want to leave?';
		};
	}

	public render() {
		return (
			<section className={root}>
				<UploadController enabled={true}>
					{(
						files: File[],
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
						const fileSelected = Boolean(files && files[0]);

						return (
							<div className={root}>
								<div className={cx(surfaceCn, videoCn)}>
									<CSSTransition
										in={!fileSelected}
										unmountOnExit
										timeout={ANIMATION_TIME}
										classNames={{
											enter: videoIllustrationAnimation.enter,
											enterActive: videoIllustrationAnimation.enterActive,
											exit: videoIllustrationAnimation.exit,
											exitActive: videoIllustrationAnimation.exitActive,
										}}
									>
										<div className={videoIllustration} />
									</CSSTransition>

									<CSSTransition
										in={fileSelected}
										unmountOnExit
										timeout={ANIMATION_TIME}
										classNames={{
											enter: progressAnimation.enter,
											enterActive: progressAnimation.enterActive,
											exit: progressAnimation.exit,
											exitActive: progressAnimation.exitActive,
										}}
									>
										<div className={progressCn}>
											<div className={valueCn}>{Math.ceil(progress)}%</div>
											<ProgressCircle
												className={progressCircleCn}
												size={CIRCLE_SIZE - 4}
												percent={percent}
												strokeWidth={2}
												meterColor={
													status === EUploadStatus.Uploading
														? COLORS.SKYBLUE.alpha(0.3).toString()
														: COLORS.GRAY.alpha(0.3).toString()
												}
												valueColor={COLORS.GREEN.toString()}
											/>
										</div>
									</CSSTransition>
								</div>

								{fileSelected ? (
									<>
										<div className={cx(UPLOAD_STYLES.texts, textsCn)}>
											<h2>
												<CropFileName maxLength={20} text={files[0].name} />
											</h2>

											{status === EUploadStatus.Uploading ? (
												<div className="text">
													{prettyBytes(loadedBytes, {
														locale: CONFIG.DEFAULT_LOCALE,
													})}{' '}
													loaded of{' '}
													{prettyBytes(totalBytes, {
														locale: CONFIG.DEFAULT_LOCALE,
													})}
													<br />
													{distanceInWords(
														new Date(Date.now() + eta),
														new Date(),
														{
															includeSeconds: true,
														},
													)}
												</div>
											) : (
												<div className="text">
													{prettyBytes(totalBytes, {
														locale: CONFIG.DEFAULT_LOCALE,
													})}
												</div>
											)}
										</div>

										{status === EUploadStatus.Uploading ? (
											<Button
												type="button"
												color={COLORS.RED.toString()}
												onClick={cancel}
												theme={EButtonTheme.Round}
											>
												Cancel
											</Button>
										) : (
											<Button
												type="button"
												color={COLORS.GREEN.toString()}
												onClick={start}
												theme={EButtonTheme.Round}
											>
												Start upload
											</Button>
										)}
									</>
								) : (
									<>
										<div className={cx(UPLOAD_STYLES.texts, textsCn)}>
											<h2>
												<Locale id="Select video file" />
											</h2>

											<div className="text">
												<i>10</i> videos left to upload today
												<br />
												Minimum <i>5 seconds</i> for video
												<br />
												<i>VR</i> and <i>60 FPS</i> supported
												<br />
												<i>4K</i> videos supported
												<br />
												Maximum <i>5 GB</i> per video
												<br />
											</div>
										</div>

										<Button
											type="button"
											color={COLORS.SKYBLUE.toString()}
											onClick={selectFile}
											theme={EButtonTheme.Round}
										>
											Select file
										</Button>
									</>
								)}

								{status !== EUploadStatus.Uploading &&  (
									<div className={UPLOAD_STYLES.legals}>
										<Locale id="SIGN_UP.LEGALS" />
									</div>
								)}
							</div>
						);
					}}
				</UploadController>
			</section>
		);
	}
}

const cloudAnimation = keyframes`
	from {
		transform: scale(.8);
		opacity: 0;
	}
	
	to {
		transform: scale(1);
		opacity: 1;
	}
`;

const root = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const surfaceCn = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 335px;
	height: 278px;
`;

const textsCn = css`
	.text {
		i {
			color: ${COLORS.WHITE.alpha(0.85).toString()};
			background-color: ${COLORS.SKYBLUE.alpha(0.3).toString()};
			padding: 0 5px 1px;
			border-radius: 3px;
			font-weight: 400;
		}
	}
`;

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
	font-weight: 200;
	font-size: ${THEME.FONT_SIZE_BIG}px;
`;

const videoIllustration = css`
	content: '';
	display: block;
	background-image: url(${require('@img/illustrations/video.png')});
	animation: ${cloudAnimation} 1s;
	animation-delay: 0.1s;
	animation-fill-mode: backwards;
	position: absolute;
	top: 0;
	left: 0;

	${UPLOAD_STYLES.illustration};
`;

const videoCn = css`
	position: relative;
	${UPLOAD_STYLES.illustration};
`;

const videoIllustrationAnimation = {
	enter: css`
		opacity: 0;
		transform: translateY(-75%);
	`,

	enterActive: css`
		opacity: 1;
		transform: translateY(0);
		transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms;
	`,

	exit: css`
		opacity: 1;
		transform: translateY(0);
	`,

	exitActive: css`
		opacity: 0;
		transform: translateY(-75%);
		transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms;
	`,
};

const progressAnimation = {
	enter: css`
		opacity: 0;
		transform: scale(0);
	`,

	enterActive: css`
		opacity: 1;
		transform: scale(1);
		transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms;
	`,

	exit: css`
		opacity: 1;
		transform: scale(1);
	`,

	exitActive: css`
		opacity: 0;
		transform: scale(0);
		transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms;
	`,
};
