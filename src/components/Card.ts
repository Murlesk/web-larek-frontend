import { ICard } from '../types';
import { categoryClassMap } from '../utils/constants';
import { Component } from './base/Component';
import { EventEmitter } from './base/events';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

interface IMiniCard {
	index: number;
	id: string;
	title: string;
	price: number;
	deleteButton: HTMLButtonElement;
}

export class Card extends Component<ICard> {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _description: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _id: string;

	constructor(
		container: HTMLElement,
		events?: EventEmitter,
		actions?: ICardActions
	) {
		super(container);

		this._title = container.querySelector(`.card__title`);
		this._image = container.querySelector(`.card__image`);
		this._category = container.querySelector(`.card__category`);
		this._price = container.querySelector(`.card__price`);
		this._button = container.querySelector(`.card__button`);
		this._description = container.querySelector(`.card__text`);

		if (actions?.onClick) {
			container.addEventListener(`click`, actions.onClick);
		}

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('basket:add', {
					id: this.id || '',
					title: this._title.textContent || '',
					price: this._price.textContent || null,
				});
			});
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set price(value: string | null) {
		if (value === null) {
			this._price.textContent = 'Бесценно';
		} else {
			this.setText(this._price, `${value} синапсов`);
		}
	}

	set category(value: string) {
		this._category.textContent = value;
		this._category.className = `card__category card__category_${
			categoryClassMap[value.toLowerCase()]
		}`;
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	disableButton() {
		this._button.setAttribute('disabled', 'disabled');
	}
}

export class MiniCard extends Component<IMiniCard> {
	protected _deleteButton: HTMLButtonElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _index: HTMLElement;
	protected _id: string;

	constructor(container: HTMLElement, events?: EventEmitter) {
		super(container);
		this._deleteButton = container.querySelector(`.basket__item-delete`);
		this._title = container.querySelector('.card__title');
		this._price = container.querySelector('.card__price');
		this._index = container.querySelector('.basket__item-index');
		if (this._deleteButton) {
			this._deleteButton.addEventListener('click', () => {
				const cardElement = this._deleteButton.closest('.basket__item');
				if (cardElement) {
					events.emit('basket:remove', cardElement);
				}
			});
		}
	}

	set index(value: string) {
		this.setText(this._index, value);
	}

	set id(value: string) {
		this._id = value;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number) {
		if (value === null) {
			this._price.textContent = '0';
		} else {
			this.setText(this._price, value);
		}
	}
}
