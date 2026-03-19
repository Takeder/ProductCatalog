import { createSlice } from "@reduxjs/toolkit";
import { type Product } from "../../shared/types/product";
import { fetchProducts } from "./actionCreators"; // Импорт нашего экшена

const productSlice = createSlice({
    name: "products",
    initialState: { items: [] as Product[], isLoading: false, error: "" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка";
            });
    },
});

export default productSlice.reducer;
