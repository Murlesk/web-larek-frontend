import { IOrderForm } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class Contacts extends Form<IOrderForm> {
	protected _button: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._button = container.querySelector('.button__pay');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:success');
			});
		}
	}

	set email(value: string) {
		const emailInput = this.container.querySelector(
			'input[name="email"]'
		) as HTMLInputElement;
		if (emailInput) {
			emailInput.value = value;
		}
	}

	set phone(value: string) {
		const phoneInput = this.container.querySelector(
			'input[name="phone"]'
		) as HTMLInputElement;
		if (phoneInput) {
			phoneInput.value = value;
		}
	}
}
