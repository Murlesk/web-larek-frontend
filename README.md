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

- Redux store

- API взаимодействие

- Локальное состояние компонентов

### 2. Бизнес-логика:

- Обработка действий пользователя

- Валидация форм

- Управление состоянием

### 3. UI-слой:

- Компоненты представления

- Маршрутизация

- Обратная связь с пользователем

## Взаимодействие с API
Приложение использует следующие API endpoints:

- `GET /products` - получение списка товаров

- `GET /products/{id}` - получение информации о товаре

- `POST /order` - оформление заказа

## Особенности реализации
### 1. Управление состоянием:

- Redux Toolkit для глобального состояния

- Локальное состояние для UI-логики

### 2. Оптимизации:

- Мемоизация компонентов

- Ленивая загрузка страниц

- Код-сплиттинг

### 3. Обработка ошибок:

- Глобальный error boundary

- Уведомления об ошибках

- Retry-логика для API запросов

### 4. Формы:

- Валидация полей

- Контролируемые компоненты

- Обработка сабмита

## Методы и их функциональность
### API методы (`features/api/`)

#### `baseApi.ts`

- `get`: Выполняет GET-запрос к указанному эндпоинту

- `post`: Отправляет POST-запрос с переданными данными

- `handleResponse`: Обрабатывает ответ сервера, проверяет на ошибки

#### `productApi.ts`

- `getProducts`: Получает список всех товаров

- `getProductById`: Получает детальную информацию о конкретном товаре

### Корзина (`features/cart/`)

#### `cartSlice.ts`

- `addItem`: Добавляет товар в корзину или увеличивает количество

- `removeItem`: Уменьшает количество товара или удаляет из корзины

- `clearCart`: Полностью очищает корзину

- `calculateTotal`: Пересчитывает общую сумму заказа

### Товары (`features/products/`)

#### `productsSlice.ts`

- `setProducts`: Сохраняет список товаров в хранилище

- `setLoading`: Управляет состоянием загрузки

- `setError`: Сохраняет ошибку при загрузке товаров

### Заказ (`features/order/`)

#### `orderSlice.ts`

- `setAddress`: Сохраняет адрес доставки

- `setPaymentMethod`: Устанавливает способ оплаты

- `setContactInfo`: Сохраняет контактные данные

- `submitOrder`: Отправляет заказ на сервер

### Компоненты (`shared/components/`)

#### `Modal`

- `open`: Открывает модальное окно

- `close`: Закрывает модальное окно

- `setContent`: Устанавливает содержимое модального окна

#### `Notification`

- `showSuccess`: Показывает уведомление об успехе

- `showError`: Показывает уведомление об ошибке

- `hide`: Скрывает уведомление

### Вспомогательные методы (`shared/utils/`)

#### `validation.ts`

- `validateEmail`: Проверяет валидность email

- `validatePhone`: Проверяет валидность телефона

- `validateAddress`: Проверяет валидность адреса

#### `formatters.ts`

- `formatPrice`: Форматирует цену для отображения

- `truncateText`: Обрезает длинный текст