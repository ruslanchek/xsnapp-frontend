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
import { Link } from 'react-router-dom';

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
											<Locale id="LEGALS_LINK" values={{ url: PATHS.TERMS }} />
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
						<Locale
							id="UPLOAD.PARAMS_VIDEOS_LEFT"
							values={{
								count: 10,
							}}
						/>
						<br />

						<Locale id="UPLOAD.PARAMS_MINIMUM_LENGTH" />
						<br />

						<Locale id="UPLOAD.PARAMS_VR_FPS_SUPPORTED" />
						<br />

						<Locale id="UPLOAD.PARAMS_MAXIMUM_SIZE" />
						<br />
					</>
				);
			}

			case EUploadStatus.FileSelected: {
				return (
					<Locale
						id="UPLOAD.FILE_SIZE"
						values={{
							size: prettyBytes(upload.totalBytes, {
								locale: CONFIG.DEFAULT_LOCALE,
							}),
						}}
					/>
				);
			}

			case EUploadStatus.Uploading: {
				return (
					<Locale
						id="UPLOAD.STATISTICS"
						values={{
							loaded: prettyBytes(upload.loadedBytes, {
								locale: CONFIG.DEFAULT_LOCALE,
							}),
							total: prettyBytes(upload.totalBytes, {
								locale: CONFIG.DEFAULT_LOCALE,
							}),
							eta: distanceInWords(
								new Date(Date.now() + upload.eta),
								new Date(),
								{
									includeSeconds: true,
								},
							),
						}}
					/>
				);
			}

			case EUploadStatus.Done: {
				return <Locale id="UPLOAD.COMPLETED" />;
			}

			default: {
				return null;
			}
		}
	}

	private getTitle(
		upload: IUploadRenderAttributes<IResultPayload>,
	): React.ReactNode {
		switch (upload.status) {
			case EUploadStatus.Ready: {
				return <Locale id="UPLOAD.SELECT_FILE" />;
			}

			case EUploadStatus.FileSelected: {
				return <CropFileName maxLength={10} text={upload.files[0].name} />;
			}

			case EUploadStatus.Uploading: {
				return <Locale id="UPLOAD.UPLOADING" />;
			}

			case EUploadStatus.Done: {
				return <Locale id="UPLOAD.DONE" />;
			}

			default: {
				return null;
			}
		}
	}

	private getButtons(
		upload: IUploadRenderAttributes<IResultPayload>,
	): React.ReactNode {
		switch (upload.status) {
			case EUploadStatus.Ready: {
				return (
					<Button
						type="button"
						color={COLORS.SKYBLUE.toString()}
						onClick={upload.selectFile}
						theme={EButtonTheme.Round}
					>
						<Locale id="UPLOAD.SELECT_FILE"/>
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
						<Locale id="UPLOAD.START"/>
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
						<Locale id="UPLOAD.CANCEL"/>
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
						<Locale id="UPLOAD.CONTINUE"/>
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
