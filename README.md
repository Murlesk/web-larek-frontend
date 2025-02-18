# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемые в приложении

Карточка товара
```
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number
}
```
Массив карточек на главной странице
```
export interface IProductsList {
    products: IProduct[];
    preview: string | null;
}
```
Информация о товарах в корзине
```
export type IBasket = Pick<IProduct, 'title' | 'price'>;
```
Форма ввода данных об адресе и способе доставки
```
export interface IOrder {
    payment: string;
    adress: string;
}
```
Форма ввода контактных данных покупателя
```
export interface IBuyerInfo {
    email: string;
    phone: string;
}
```
Проверка валидации форм
```
export interface IOrderData {
    CheckValidation(data: Record<keyof IOrder, string>): boolean;
}

export interface IBuyerInfoData {
    CheckValidation(data: Record<keyof IBuyerInfo, string>): boolean;
}
```