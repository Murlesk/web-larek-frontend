import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

interface ISuccess {
	total: number;
}

interface ISuccessActions {
	onClick: () => void;
}

export class Success extends Component<ISuccess> {
	protected _close: HTMLElement;
	protected _totalElement: HTMLElement;
	protected _total = '0';

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);

		this._totalElement = container.querySelector('.order-success__description');

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	get total(): string {
		return this._total;
	}

	set total(value: string) {
		this._total = value;
		this.setText(this._totalElement, `Списано ${value} синапсов`);
	}
}
