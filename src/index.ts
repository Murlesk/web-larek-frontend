import { AppState } from './components/AppData';
import { Card, MiniCard } from './components/Card';
import { Contacts } from './components/Contacts';
import { Order } from './components/Order';
import { Page } from './components/Page';
import { ShopAPI } from './components/ShopAPI';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/common/Basket';
import { Modal } from './components/common/Modal';
import { Success } from './components/common/Success';
import './scss/styles.scss';
import { CatalogChangeEvent, ICard, IOrderForm } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();
const api = new ShopAPI(CDN_URL, API_URL);

const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const appData = new AppState({}, events);

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		modal.close();
	},
});

events.on('basket:add', (item: ICard & { button: HTMLButtonElement }) => {
	const miniCard = new MiniCard(cloneTemplate(cardBasketTemplate), events);
	const index = basket.getBasketItems().length + 1;
	const cardElement = miniCard.render({
		index: index,
		id: item.id,
		title: item.title,
		price: item.price,
	});

	basket.addItem(cardElement);
	appData.order.items.push(item.id);

	let priceNumber = parseFloat(item.price.toString().replace(/\D+/g, ''));

	if (isNaN(priceNumber)) {
		priceNumber = 0;
	}

	basket.total = (Number(basket.total) + priceNumber).toString();

	page.counter = basket.getBasketItems().length;
	modal.close();
});

events.on('basket:remove', (item: HTMLElement) => {
	const titleElement = item.querySelector('.card__title');
	const title = titleElement.textContent;

	basket.removeItem(item);

	const removedItemId = appData.order.items.findIndex((orderItemId) => {
		const orderItem = appData.catalog.find((item) => item.id === orderItemId);
		return orderItem && orderItem.title === title;
	});

	if (removedItemId !== -1) {
		appData.order.items.splice(removedItemId, 1);
	}

	const priceElement = item.querySelector('.card__price');
	let price = parseFloat(priceElement.textContent.replace(/\D+/g, ''));
	if (isNaN(price)) {
		price = 0;
	}
	basket.total = (parseFloat(basket.total) - price).toString();

	basket.getBasketItems().forEach((basketItem, index) => {
		basketItem.querySelector('.basket__item-index').textContent = (
			index + 1
		).toString();
	});

	modal.render({
		content: basket.render({
			items: basket.getBasketItems(),
			total: Number(basket.total),
		}),
	});

	page.counter = basket.getBasketItems().length;
});

events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), events, {
			onClick: () => events.emit('card:select', item),
		});

		return card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			description: item.description,
			category: item.category,
			price: item.price,
		});
	});
});

events.on('card:select', (item: ICard) => {
	const alreadyInBasket = basket.getBasketItems().some((basketItem) => {
		const titleElement = basketItem.querySelector('.card__title');
		return titleElement.textContent === item.title;
	});

	const card = new Card(cloneTemplate(cardPreviewTemplate), events);

	if (alreadyInBasket || item.price === null) {
		card.disableButton();
	}

	modal.render({
		content: card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			description: item.description,
			category: item.category,
			price: item.price,
		}),
	});
});

events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:open', () => {
	modal.render({
		content: order.render({
			payment: 'card',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:success', () => {
	appData.order.total = Number(basket.total);
	api
		.orderProducts(appData.order)
		.then(() => {
			success.total = basket.total;
			modal.render({
				content: success.render({}),
			});
			basket.removeAllItem();
			appData.order = {
				payment: appData.order.payment,
				address: '',
				phone: '',
				email: '',
				items: [],
				total: null,
			};
			basket.updateButtonState();
			page.counter = 0;
		})
		.catch((err) => {
			console.error(err);
		});
});

events.on(
	/^(order(\.payment)?|contacts)\.(.*):change/,
	(data: { field: keyof IOrderForm; value: string | null }) => {
		appData.setOrderField(data.field, data.value || '');
	}
);

events.on('basket:open', () => {
	modal.render({
		content: basket.render({
			items: basket.getBasketItems(),
			total: Number(basket.total),
		}),
	});
});

events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { address, payment } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

events.on('formContactsErrors:change', (errors: Partial<IOrderForm>) => {
	const { phone, email } = errors;
	contacts.valid = !phone && !email;
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

api
	.getProductsList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});
