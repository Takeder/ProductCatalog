import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import productReducer from "./reducers/productSlice"; // Редьюсер товаров
import cartReducer from "./reducers/cartSlice"; // Редьюсер корзины
import favoritesReducer from "./reducers/favoritesSlice"; // Редьюсер избранного

// 1. Загружаем и избранное, и корзину
// Функция чтения из LocalStorage
const loadFromLocalStorage = (key: string) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : undefined; // Превращаем из строки в объект
    } catch {
        return undefined;
    }
};

// Объединяем все редьюсеры в один корневой объект
const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    favorites: favoritesReducer, // Добавили ветку избранного
});

/**
 * Настройка хранилища (Store).
 * preloadedState — это начальное состояние, которое "перекрывает"
 * стандартные значения из слайсов при запуске приложения.
 */
// Создаем финальный стор
export const store = configureStore({
    reducer: rootReducer, // Указываем наш общий редьюсер
    // Загружаем данные из памяти браузера при старте
    preloadedState: {
        cart: loadFromLocalStorage("cart"),
        favorites: loadFromLocalStorage("favorites"), // Инициализируем избранное
    },
});

/**
 * Подписка на изменения стора.
 * Функция внутри subscribe выполняется после каждого успешно отправленного экшена.
 * Мы сохраняем в localStorage только ветку 'cart', чтобы не перегружать память.
 */
// 2. Подписываемся на сохранение обеих веток
store.subscribe(() => {
    // console.log("store");

    const state = store.getState(); // Получаем актуальное состояние
    localStorage.setItem("cart", JSON.stringify(state.cart)); // Сохраняем корзину в строку
    localStorage.setItem("favorites", JSON.stringify(state.favorites)); // Сохраняем избранное в строку
});

// Типизация для TypeScript
export type RootState = ReturnType<typeof store.getState>; // Тип всего состояния (для TS)
export type AppDispatch = typeof store.dispatch; // Тип функции отправки экшенов (для TS)

// Кастомные хуки с привязанными типами (удобно для автодополнения в компонентах)
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
