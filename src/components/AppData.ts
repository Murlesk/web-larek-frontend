import {
	FormErrors,
	IAppState,
	ICard,
	IOrder,
	IOrderForm,
	OrderPayment,
} from '../types';
import { Model } from './base/Model';

export class ProductItem extends Model<ICard> {
	id: string;
	description: string;
	image: string;
	title: string;
	price: number | null;
	category: string;
}

export class AppState extends Model<IAppState> {
	basket: string[];
	catalog: ICard[];
	loading: boolean;
	order: IOrder = {
		payment: 'card',
		address: '',
		phone: '',
		email: '',
		items: [],
		total: null,
	};
	preview: string | null;
	formErrors: FormErrors = {};

	setCatalog(items: ICard[]) {
		this.catalog = items.map((item) => new ProductItem(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value as OrderPayment;

		if (this.validateForm() && this.validateFormContacts()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateForm() {
		const errors: typeof this.formErrors = {};

		if (!this.order.payment || !this.order.address) {
			errors.payment = !this.order.payment
				? 'Необходимо указать способ оплаты'
				: '';
			errors.address = !this.order.address ? 'Необходимо указать адрес' : '';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		const isValid = Object.keys(errors).length === 0;
		this.events.emit(`${this.constructor.name}.valid:change`, { isValid });
		return isValid;
	}

	validateFormContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email || !this.order.phone) {
			errors.email = !this.order.email ? 'Необходимо указать email' : '';
			errors.phone = !this.order.phone ? 'Необходимо указать телефон' : '';
		}
		this.formErrors = errors;
		this.events.emit('formContactsErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
