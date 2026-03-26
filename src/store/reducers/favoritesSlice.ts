import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../../shared/types/product";

interface FavoritesState {
    items: Product[];
}

const initialState: FavoritesState = {
    items: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    selectors: {
        selectedFavoritesCount: (state) => {
            return state.items.length;
        },
    },
    reducers: {
        // Переключатель: если товара нет — добавляем, если есть — удаляем
        toggleFavorite: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex(
                (i) => i.id === action.payload.id,
            );
            if (index >= 0) {
                state.items.splice(index, 1); // Удаляем
            } else {
                state.items.push(action.payload); // Добавляем
            }
        },
        clearFavorites: (state) => {
            state.items = [];
        },
    },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export const { selectedFavoritesCount } = favoritesSlice.selectors;
export default favoritesSlice.reducer;
