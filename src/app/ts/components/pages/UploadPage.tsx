import * as React from 'react';
import { ELayoutBackgroundColor, Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { UploadGetStarted } from '../upload/UploadGetStarted';
import { PATHS } from '../../config';
import { Locale } from '../hocs/Locale';
import { Link } from 'react-router-dom';
import { Upload } from '../upload/Upload';

interface IProps {
	mode: EUploadPageMode;
}

interface IState {}

export enum EUploadPageMode {
	GetStarted,
	Upload,
}

export class UploadPage extends React.Component<IProps, IState> {
	public state: IState = {};

	public render() {
		return (
			<Layout
				background={ELayoutBackgroundColor.Blue}
				backLink={this.getBackLink}
				topLink={this.getTopLink}
			>
				<main className={root}>
					{this.getContent}
				</main>
			</Layout>
		);
	}

	private get getContent() {
		switch (this.props.mode) {
			case EUploadPageMode.GetStarted : {
				return <UploadGetStarted />;
			}

			case EUploadPageMode.Upload : {
				return <Upload />;
			}
		}
	}

	private get getBackLink() {
		switch (this.props.mode) {
			case EUploadPageMode.GetStarted : {
				return PATHS.HOME;
			}

			case EUploadPageMode.Upload : {
				return PATHS.UPLOAD_GET_STARTED;
			}
		}
	}

	private get getTopLink() {
		return (
			<Link to={PATHS.HOME}>
				<Locale id="Your uploads" />
			</Link>
		);
	}
}

const root = css`
	padding: 15px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;
