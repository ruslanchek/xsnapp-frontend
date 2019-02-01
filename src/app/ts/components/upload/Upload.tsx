import * as React from 'react';
import { css, cx, keyframes } from 'react-emotion';
import {
	EUploadStatus,
	IUploadRenderAttributes,
	UploadController,
} from './UploadController';
import { UploadProgress } from './UploadProgress';
import { COLORS } from 'app/ts/theme';
import { Button, EButtonTheme } from '../ui/Button';
import { UPLOAD_STYLES } from './styles';
import { CSSTransition } from 'react-transition-group';
import { CropFileName } from '../common/CropFileName';
import { CONFIG, PATHS } from '../../config';
import { distanceInWords } from 'date-fns';
import * as prettyBytes from 'pretty-bytes';
import { Locale } from '../hocs/Locale';
import { EIconName, SvgIcon } from '../ui/SvgIcon';
import { ItemsStore } from '../../stores/ItemsStore';
import IItem = ItemsStore.IItem;
import { managers } from '../../managers';

interface IProps {}

interface IState {}

const CIRCLE_SIZE = 160;
const ANIMATION_TIME = 1000;

interface IResultPayload {
	data: { item: IItem };
	error: {};
}

export class Upload extends React.Component<IProps, IState> {
	public state: IState = {};

	public componentDidMount(): void {
		// window.onbeforeunload = () => {
		// 	return 'Are you sure you want to leave?';
		// };
	}

	public render() {
		return (
			<section className={root}>
				<UploadController enabled={true}>
					{(upload: IUploadRenderAttributes<IResultPayload>) => {
						const percent = Math.ceil(upload.progress);

						return (
							<div className={root}>
								<div className={cx(surfaceCn, videoCn)}>
									<CSSTransition
										in={!upload.fileSelected}
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
										in={upload.fileSelected}
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
											<UploadProgress
												className={progressCircleCn}
												size={CIRCLE_SIZE - 4}
												percent={Math.ceil(percent)}
												status={upload.status}
											/>
										</div>
									</CSSTransition>
								</div>

								<div className={cx(UPLOAD_STYLES.texts)}>
									<h1>{this.getTitle(upload)}</h1>
									<div className="text">{this.getText(upload)}</div>
								</div>

								{this.getButtons(upload)}

								{upload.status !== EUploadStatus.Uploading &&
									upload.status !== EUploadStatus.Done && (
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

	private getText(upload: IUploadRenderAttributes<IResultPayload>) {
		switch (upload.status) {
			case EUploadStatus.Ready: {
				return (
					<>
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
					</>
				);
			}

			case EUploadStatus.FileSelected: {
				return (
					<>
						File size:{' '}
						<i>
							{prettyBytes(upload.totalBytes, {
								locale: CONFIG.DEFAULT_LOCALE,
							})}
						</i>
					</>
				);
			}

			case EUploadStatus.Uploading: {
				return (
					<>
						<i>
							{prettyBytes(upload.loadedBytes, {
								locale: CONFIG.DEFAULT_LOCALE,
							})}
						</i>{' '}
						uploaded of{' '}
						<i>
							{prettyBytes(upload.totalBytes, {
								locale: CONFIG.DEFAULT_LOCALE,
							})}
						</i>
						<br />
						Estimated time{' '}
						<i>
							{distanceInWords(new Date(Date.now() + upload.eta), new Date(), {
								includeSeconds: true,
							})}
						</i>
					</>
				);
			}

			case EUploadStatus.Done: {
				return <>Upload completed successfully</>;
			}

			default: {
				return null;
			}
		}
	}

	private getTitle(upload: IUploadRenderAttributes<IResultPayload>): React.ReactNode {
		switch (upload.status) {
			case EUploadStatus.Ready: {
				return <Locale id="Select video file" />;
			}

			case EUploadStatus.FileSelected: {
				return <CropFileName maxLength={10} text={upload.files[0].name} />;
			}

			case EUploadStatus.Uploading: {
				return <>Uploading</>;
			}

			case EUploadStatus.Done: {
				return <>Congratulations</>;
			}

			default: {
				return null;
			}
		}
	}

	private getButtons(upload: IUploadRenderAttributes<IResultPayload>): React.ReactNode {
		switch (upload.status) {
			case EUploadStatus.Ready: {
				return (
					<Button
						type="button"
						color={COLORS.SKYBLUE.toString()}
						onClick={upload.selectFile}
						theme={EButtonTheme.Round}
					>
						Select file
					</Button>
				);
			}

			case EUploadStatus.FileSelected: {
				return (
					<Button
						type="button"
						color={COLORS.SKYBLUE.toString()}
						onClick={upload.start}
						theme={EButtonTheme.Round}
					>
						Start upload
					</Button>
				);
			}

			case EUploadStatus.Uploading: {
				return (
					<Button
						type="button"
						color={COLORS.RED.toString()}
						onClick={upload.cancel}
						theme={EButtonTheme.Round}
					>
						Cancel
					</Button>
				);
			}

			case EUploadStatus.Done: {
				return (
					<Button
						type="button"
						color={COLORS.SKYBLUE.toString()}
						onClick={() => {
							managers.route.go(
								PATHS.USER_EDIT_ITEM.replace(
									':itemId',
									upload.requestData.data.item.id.toString(),
								),
							);
						}}
						theme={EButtonTheme.Round}
					>
						Continue
						<SvgIcon
							width={'30px'}
							height={'30px'}
							name={EIconName.ArrowForward}
						/>
					</Button>
				);
			}

			default: {
				return null;
			}
		}
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
	position: relative;
	top: -20px;
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
		transform: scale(0.8);
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
		transform: scale(0.8);
		transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms;
	`,
};
