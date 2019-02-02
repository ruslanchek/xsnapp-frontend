import * as React from 'react';

interface IProps {
	text: string;
	maxLength: number;
}

export class CropFileName extends React.PureComponent<IProps, {}> {
	public render() {
		const { text, maxLength } = this.props;
		const textParts = text.split('.');
		let result = text;
		let postfix = '';

		if (text.length > maxLength) {
			if (textParts.length === 1) {
				result = textParts[0];
			} else if (textParts.length === 2) {
				result = textParts[0];
				postfix = '.' + textParts[1];
			} else {
				result = text.replace(`.${textParts[textParts.length - 1]}`, '');
				postfix = '.' + textParts[textParts.length - 1];
			}

			const partLength = Math.ceil(maxLength / 2);

			result = `${result.substr(0, partLength)}...${result.substr(
				result.length - partLength,
				partLength,
			)}`;
		}

		return (
			<span>
				{result}
				{postfix}
			</span>
		);
	}
}
