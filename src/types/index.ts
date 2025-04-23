export type OrderPayment = 'card' | 'cash';

export interface IOrderForm {
	payment: OrderPayment;
	email: string;
	phone: string;
	address: string;
}

export interface IOrder extends IOrderForm {
	items: string[];
	total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
	id: string;
	total: number;
}

export interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IAppState {
	catalog: ICard[];
	basket: string[];
	order: IOrder | null;
	loading: boolean;
	total: number | null;
}

export type CatalogChangeEvent = {
	catalog: ICard[];
};
