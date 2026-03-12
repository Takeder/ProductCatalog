import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../shared/types/product";
import { fetchProducts } from "./actionCreators";

export interface ProductState {
    product: Product[];
    isLoading: boolean;
    error: string;
}

const initialState: ProductState = {
    product: [],
    isLoading: false,
    error: "",
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //редюсеры для асинхронных actions
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
        });
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error =
                action.payload instanceof Error
                    ? action.payload.message
                    : "Сетевая ошибка";
        });
    },
});

export default productSlice.reducer;
