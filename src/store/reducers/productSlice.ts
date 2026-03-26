import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../../shared/types/product";
import { fetchProducts } from "./actionCreators"; // Импорт нашего экшена

export type SortOption = "default" | "price-low" | "price-high" | "title";

interface ProductState {
    items: Product[];
    isLoading: boolean;
    error: string;
    sortBy: SortOption;
    searchQuery: string;
}

const initialState: ProductState = {
    items: [], // Список товаров (пустой массив)
    isLoading: false,
    error: "",
    sortBy: "default", // Сортировка по умолчанию
    searchQuery: "", // Поиск (пустая строка)
};

const productSlice = createSlice({
    name: "products", // Уникальное имя
    initialState,
    selectors: {},
    // Обычные действия (синхронные)
    reducers: {
        // Экшен для смены типа сортировки
        setSortBy: (state, action: PayloadAction<SortOption>) => {
            state.sortBy = action.payload;
        },
        //Экшен для изменения текста поиска
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
    // Обработка внешнего запроса fetchProducts. Ассинхронный код
    extraReducers: (builder) => {
        builder
            // Состояние "В процессе"
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            // Состояние "Успех"
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            // Состояние "Ошибка"
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка";
            });
    },
});

export const { setSortBy, setSearchQuery } = productSlice.actions; // Экспортируем экшены
export default productSlice.reducer; // Экспортируем редьюсер
