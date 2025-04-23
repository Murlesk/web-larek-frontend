import { createElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';

interface IBasketView {
	items?: HTMLElement[];
	total?: number;
}

export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _totalElement: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _basketItems: HTMLElement[] = [];
	protected _total = '0';

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = this.container.querySelector('.basket__list');
		this._totalElement = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__action');

		this._button.setAttribute('disabled', 'disabled');

		this._button.addEventListener('click', () => {
			events.emit('order:open');
		});
	}

	get total(): string {
		return this._total;
	}

	set total(value: string) {
		this._total = value;
		this.setText(this._totalElement, `${value} синапсов`);
	}

	set items(items: HTMLElement[]) {
		if (items.length === 0) {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		} else {
			this._list.replaceChildren(...items);
		}
	}

	updateButtonState() {
		if (this._basketItems.length === 0) {
			this._button.setAttribute('disabled', 'disabled');
		} else {
			this._button.removeAttribute('disabled');
		}
	}

	getBasketItems() {
		return this._basketItems;
	}

	addItem(item: HTMLElement) {
		this._basketItems.push(item);
		this.updateButtonState();
	}

	removeItem(item: HTMLElement) {
		const index = this._basketItems.indexOf(item);
		if (index !== -1) {
			this._basketItems.splice(index, 1);
			this.updateButtonState();
		}
	}

	removeAllItem() {
		this._basketItems = [];
		this.total = '0';
	}

	render(data: Partial<IBasketView>): HTMLElement {
		if (data.items) {
			this.items = data.items;
		}
		if (data.total) {
			this.total = data.total.toString();
		}
		return this.container;
	}
}
