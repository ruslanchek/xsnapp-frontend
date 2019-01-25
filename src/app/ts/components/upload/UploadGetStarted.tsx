import * as React from 'react';
import { css, keyframes } from 'react-emotion';
import { COLORS, COMMON_STYLES } from '../../theme';
import { Button, EButtonTheme } from '../ui/Button';
import { EIconName, SvgIcon } from '../ui/SvgIcon';
import { Locale } from '../hocs/Locale';
import { managers } from '../../managers';
import { PATHS } from '../../config';
import { UPLOAD_STYLES } from './styles';

interface IProps {}

interface IState {}

export class UploadGetStarted extends React.Component<IProps, IState> {
	public state: IState = {};

	public render() {
		return (
			<section className={root}>
				<div className={cloud} />

				<div className={UPLOAD_STYLES.texts}>
					<h2>
						<Locale id="Upload your video" />
					</h2>

					<div className="text">
						<Locale id="You can upload up to <i>10</i> videos per day" />
					</div>
				</div>

				<Button
					onClick={() => {
						managers.route.go(PATHS.UPLOAD_DO_UPLOAD);
					}}
					color={COLORS.SKYBLUE.toString()}
					type="button"
					theme={EButtonTheme.Round}
					iconRight={
						<SvgIcon
							width={'30px'}
							height={'30px'}
							name={EIconName.ArrowForward}
						/>
					}
				>
					<Locale id="Continue" />
				</Button>

				<div className={UPLOAD_STYLES.legals}>
					<Locale id="SIGN_UP.LEGALS" />
				</div>
			</section>
		);
	}
}

const cloudAnimation = keyframes`
	from {
		transform: translateY(40px);
		opacity: 0;
	}
	
	to {
		transform: translateY(0);
		opacity: 1;
	}
`;

const root = css`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const cloud = css`
	background-image: url(${require('@img/illustrations/upload-cloud.png')});
	animation: ${cloudAnimation} 2s;
	animation-delay: 0.1s;
	animation-fill-mode: backwards;
	
	${UPLOAD_STYLES.illustration}
`;
