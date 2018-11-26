import * as React from 'react';
import { css } from 'react-emotion';
import { Loader } from './Loader';
import { COLORS } from 'app/ts/theme';

interface IProps {}

interface IState {}

export class PageLoading extends React.Component<IProps, IState> {
	public state: IState = {};

	public render() {
		return (
			<div className={loading}>
				<Loader color={COLORS.WHITE} />
			</div>
		);
	}
}

const loading = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
