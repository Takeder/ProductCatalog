import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./actionCreators";
import { type Product } from "../../shared/types/product";

interface ProductState {
    items: Product[];
    isLoading: boolean;
    error: string;
}

const initialState: ProductState = {
    items: [], // Список товаров (изначально пустой)
    isLoading: false, // Флаг загрузки (изначально выключен)
    error: "", // Сообщение об ошибке (изначально пустое)
};

const productSlice = createSlice({
    name: "products", // Имя слайса для внутреннего использования Redux
    initialState,
    reducers: {}, // Для синхронных действий (например, очистка списка)
    extraReducers: (builder) => {
        // Обработка внешних событий (наш асинхронный thunk)
        builder
            .addCase(fetchProducts.pending, (state) => {
                // Когда запрос начался
                state.isLoading = true; // Показываем лоадер // Включаем индикатор загрузки
                state.error = "";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                // Когда данные пришли
                state.isLoading = false; // Выключаем загрузку
                state.items = action.payload; // Сохраняем данные из API // Записываем товары в стейт
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                // Если случилась ошибка
                state.isLoading = false; // Выключаем загрузку
                state.error = action.error.message || "Ошибка загрузки"; // Записываем текст ошибки
            });
    },
});

export default productSlice.reducer; // Экспортируем редьюсер для стора
