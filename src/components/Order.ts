import { IOrderForm } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class Order extends Form<IOrderForm> {
	protected _paymentButtons: NodeListOf<HTMLButtonElement>;
	public payment: string = 'card';

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._paymentButtons = container.querySelectorAll('.order__buttons button');

		if (this._paymentButtons) {
			this._paymentButtons.forEach((button) => {
				button.addEventListener('click', () => {
					this.handleButtonClick(button);
				});
				if (button.getAttribute('name') === 'card') {
					button.classList.add('button_alt-active');
				}
			});
		}
	}

	private handleButtonClick(clickedButton: HTMLButtonElement) {
		this._paymentButtons.forEach((button) => {
			button.classList.remove('button_alt-active');
		});

		clickedButton.classList.add('button_alt-active');
		this.payment = clickedButton.getAttribute('name');
		this.events.emit('order.payment:change', {
			field: 'payment',
			value: this.payment,
		});
	}

	set address(value: string) {
		const addressInput = this.container.querySelector(
			'input[name="address"]'
		) as HTMLInputElement;
		if (addressInput) {
			addressInput.value = value;
		}
	}
}
