import {
    createSlice, // Функция для создания "слайса" (части глобального состояния)
    createSelector, // Инструмент для создания мемоизированных (умных) вычислений
    type PayloadAction, // Тип для данных, которые приходят в экшен (поле payload)
} from "@reduxjs/toolkit";
import { type Product } from "../../shared/types/product"; // Импорт интерфейса товара
import { fetchProducts } from "./actionCreators"; // Импорт асинхронного запроса к API

// Определяем доступные режимы сортировки для использования в коде
export type SortOption = "default" | "price-low" | "price-high" | "title";

// Описываем структуру состояния этой ветки (как выглядят данные в Store)
interface ProductState {
    items: Product[]; // Массив всех товаров, полученных с сервера
    isLoading: boolean; // Флаг: идет ли сейчас загрузка (для спиннера)
    error: string; // Текст ошибки, если запрос к серверу упал
    sortBy: SortOption; // Текущий режим сортировки (выбранный пользователем)
    searchQuery: string; // Текущий текст, введенный в поле поиска
}

// Задаем начальные значения при первом запуске приложения
const initialState: ProductState = {
    items: [], // Список товаров изначально пуст
    isLoading: false, // Загрузка изначально не идет
    error: "", // Ошибок нет
    sortBy: "default", // Сортировка по умолчанию (как пришло с сервера)
    searchQuery: "", // Поиск пустой
};

/**
 * ВХОДНЫЕ СЕЛЕКТОРЫ (Input Selectors)
 * Это простые функции, которые просто достают нужный кусочек из стейта.
 * Мы объявили их ДО слайса, чтобы createSelector видел их в памяти.
 */
const selectItems = (state: ProductState) => state.items; // Достает массив товаров
const selectSearch = (state: ProductState) => state.searchQuery; // Достает текст поиска
const selectSort = (state: ProductState) => state.sortBy; // Достает режим сортировки

const productSlice = createSlice({
    name: "product", // Уникальное имя слайса для инструментов разработчика
    initialState, // Подключаем начальное состояние
    selectors: {
        // Прокидываем базовые значения наружу для использования в компонентах
        selectSearchQuery: selectSearch, // Чтобы SearchBar знал, что написано в поиске
        selectSortBy: selectSort, // Чтобы SortControls знал, какая кнопка активна

        /**
         * ГЛАВНЫЙ СЕЛЕКТОР: selectDisplayItems
         * Это "конвейер", который готовит финальный список товаров для экрана.
         */
        selectDisplayItems: createSelector(
            // 1. Следим за этими тремя значениями:
            [selectItems, selectSearch, selectSort],
            // 2. Если хоть одно из них изменилось, запускаем эту функцию:
            (items, searchQuery, sortBy) => {
                // ШАГ 1: Фильтрация по названию (без учета регистра)
                const filtered = items.filter(
                    (item) =>
                        item.title
                            .toLowerCase() // Название товара к маленьким буквам
                            .includes(searchQuery.toLowerCase()), // Проверяем наличие поисковой строки
                );

                // ШАГ 2: Сортировка (делаем копию [...filtered], так как sort меняет оригинал)
                return [...filtered].sort((a, b) => {
                    if (sortBy === "price-low") return a.price - b.price; // От дешевых к дорогим
                    if (sortBy === "price-high") return b.price - a.price; // От дорогих к дешевым
                    if (sortBy === "title")
                        return a.title.localeCompare(b.title); // По алфавиту (А-Я)
                    return 0; // Для "default" оставляем порядок как есть
                });
            },
        ),
    },
    // РЕДЬЮСЕРЫ: Функции для изменения состояния (синхронные)
    reducers: {
        // Установка нового режима сортировки
        setSortBy: (state, action: PayloadAction<SortOption>) => {
            state.sortBy = action.payload; // Записываем значение из компонента в Store
        },
        // Установка нового текста поиска
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload; // Обновляем строку поиска в Store
        },
    },
    // ЭКСТРА-РЕДЬЮСЕРЫ: Обработка внешних событий (асинхронный fetchProducts)
    extraReducers: (builder) => {
        builder
            // Состояние "Запрос пошел" (Pending)
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true; // Включаем индикатор загрузки
                state.error = ""; // Сбрасываем старую ошибку
            })
            // Состояние "Успешный ответ" (Fulfilled)
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false; // Выключаем лоадер
                state.items = action.payload; // Записываем пришедшие товары в массив items
            })
            // Состояние "Ошибка сервера" (Rejected)
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false; // Выключаем лоадер
                state.error = action.error.message || "Ошибка"; // Записываем текст ошибки
            });
    },
});

// Экспортируем "умные" селекторы для использования в useAppSelector()
export const { selectDisplayItems, selectSearchQuery, selectSortBy } =
    productSlice.selectors;

// Экспортируем экшены для использования в dispatch() (в кнопках и инпутах)
export const { setSortBy, setSearchQuery } = productSlice.actions;

// Экспортируем итоговый редьюсер для подключения в store.ts
export default productSlice.reducer;
