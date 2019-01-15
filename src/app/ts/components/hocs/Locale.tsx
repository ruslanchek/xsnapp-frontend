import * as React from 'react';
import { withI18n } from 'react-i18next';

interface IProps {
	t: any;
	id: string;
	values?: object;
}

class TransComponent extends React.PureComponent<IProps> {
	public static defaultProps: Partial<IProps> = {
		values: {},
	};

	public render() {
		const html = this.props.t(this.props.id, this.props.values);

		return (
			<span
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			/>
		);
	}
}

export const Locale = withI18n()(TransComponent);
