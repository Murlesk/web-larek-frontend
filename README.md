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
## Структура проекта
```
src/
│
├── app/                    # Конфигурация хранилища
│   ├── store.ts            # Redux store
│   └── rootReducer.ts      # Комбинированные редьюсеры
│
├── features/               # Функциональные модули
│   ├── api/                # Работа с API
│   │   ├── baseApi.ts      # Базовые настройки axios
│   │   └── productApi.ts   # API товаров
│   │
│   ├── cart/               # Логика корзины
│   │   ├── components/     # Компоненты корзины
│   │   ├── hooks/         # Кастомные хуки
│   │   └── slice.ts       # Redux slice
│   │
│   ├── order/              # Оформление заказа
│   │   ├── components/     # Компоненты заказа
│   │   └── slice.ts       # Redux slice
│   │
│   └── products/           # Товары
│       ├── components/     # Компоненты товаров
│       └── slice.ts       # Redux slice
│
├── pages/                  # Страницы приложения
│   ├── CartPage/           # Страница корзины
│   ├── CatalogPage/        # Каталог товаров
│   └── ProductPage/        # Страница товара
│
├── shared/                 # Общие компоненты и утилиты
│   ├── components/         # UI-компоненты
│   │   ├── AppHeader/      # Шапка приложения
│   │   ├── Modal/          # Модальные окна
│   │   └── Notification/   # Уведомления
│   │
│   ├── hooks/              # Кастомные хуки
│   ├── styles/             # Глобальные стили
│   ├── types/              # Типы данных
│   └── utils/              # Вспомогательные функции
│
├── App.tsx                 # Корневой компонент
└── main.tsx                # Точка входа
```

## Основные сущности и типы данных
### Товар (Product)

```
interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
```
### Корзина (Cart)
```
interface ICartItem extends Pick<IProduct, 'id' | 'title' | 'price'> {
  quantity: number;
}

interface ICartState {
  items: ICartItem[];
  total: number;
}
```
### Заказ (Order)
```
interface IOrderForm {
  address: string;
  payment: 'online' | 'cash';
  email: string;
  phone: string;
}

interface IOrder extends IOrderForm {
  items: ICartItem[];
  total: number;
}
```

## Архитектура приложения
Приложение построено по принципам Feature-Sliced Design с разделением на:

### 1. Слой данных:

        Redux store

        API взаимодействие

        Локальное состояние компонентов

### 2. Бизнес-логика:

        Обработка действий пользователя

        Валидация форм

        Управление состоянием

### 3. UI-слой:

        Компоненты представления

        Маршрутизация

        Обратная связь с пользователем