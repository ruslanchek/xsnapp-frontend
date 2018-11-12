import * as React from 'react';
import { Validator } from './Validators/Validator';

export const FormContext = React.createContext<IFormContext>({
	setValue: null,
	getErrors: null,
});

export interface IFormContext {
	setValue: (name: string, value: IFormValue) => void;
	getErrors: (name: string) => string[];
}

export interface IFormValue {
	value: string;
	validators: Validator[];
	errors?: string[];
}

export interface IFormModel {
	[name: string]: IFormValue;
}

export interface IFormModelOutput {
	values: { [name: string]: string };
	errors: { [name: string]: string[] }
	isValid: boolean;
}

export enum EFormValidateOn {
	ALL,
	SUBMIT,
	CHANGE,
}

interface IProps {
	onSubmit: (output: IFormModelOutput) => void;
	validateOn: EFormValidateOn;
	className?: string;
}

interface IState {
	isValid: boolean;
	model: IFormModel;
}

export class Form extends React.Component<IProps, IState> {
	public state: IState = {
		isValid: null,
		model: {},
	};

	public render() {
		return (
			<form
				onSubmit={this.handleSubmit}
				className={this.props.className}
			>
				<FormContext.Provider value={{
					setValue: this.setValue,
					getErrors: this.getErrors,
				}}>
					{this.props.children}
				</FormContext.Provider>
			</form>
		);
	}

	private validate(callback: () => void) {
		const { model } = this.state;
		let isValid: boolean = true;

		for (const modelKey in model) {
			if (model.hasOwnProperty(modelKey)) {
				const { validators, value } = model[modelKey];

				model[modelKey].errors = [];

				validators.forEach((validator) => {
					validator.model = model;

					if (!validator.validate(value)) {
						model[modelKey].errors.push(validator.extractError());
						isValid = false;
					}

					validator.model = null;
				});
			}
		}

		this.setState({
			isValid,
			model,
		}, callback);
	}

	private collectModel(): IFormModelOutput {
		const { model } = this.state;
		const resultModel: { [name: string]: string } = {};
		const errors: { [name: string]: string[] } = {};

		for (const modelKey in model) {
			if (model.hasOwnProperty(modelKey)) {
				resultModel[modelKey] = model[modelKey].value;
				errors[modelKey] = model[modelKey].errors;
			}
		}

		return {
			isValid: this.state.isValid,
			values: resultModel,
			errors,
		};
	}

	private getErrors = (name: string) => {
		const { model } = this.state;
		
		if(model[name] && model[name].errors) {
			return model[name].errors;
		} else {
			return [];
		}
	};

	private setValue = (name: string, value: IFormValue) => {
		const newValues = this.state.model;

		newValues[name] = value;

		this.setState({
			model: newValues,
		}, () => {
			if(this.props.validateOn === EFormValidateOn.CHANGE || this.props.validateOn === EFormValidateOn.ALL) {
				this.validate(() => {

				});
			}
		});
	};

	private handleSubmit = async (e) => {
		e.preventDefault();

		if(this.props.validateOn === EFormValidateOn.SUBMIT || this.props.validateOn === EFormValidateOn.ALL) {
			this.validate(() => {
				this.props.onSubmit(this.collectModel());
			});
		} else {
			this.props.onSubmit(this.collectModel());
		}
	};
}
