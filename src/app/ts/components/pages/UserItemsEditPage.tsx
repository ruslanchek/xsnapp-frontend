import * as React from 'react';
import { ELayoutBackgroundColor, Layout } from '../common/Layout';
import { css } from 'react-emotion';
import { UploadGetStarted } from '../upload/UploadGetStarted';
import { PATHS } from '../../config';
import { Locale } from '../hocs/Locale';
import { Link } from 'react-router-dom';
import { Upload } from '../upload/Upload';

interface IProps {}

interface IState {}

export class UserItemsEditPage extends React.Component<IProps, IState> {
	public state: IState = {};

	public render() {
		return (
			<Layout
				showFooter={true}
				showHeader={true}
			>
				xxx
			</Layout>
		);
	}
}

const root = css`
	padding: 15px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;
