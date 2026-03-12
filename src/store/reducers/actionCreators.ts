import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "../../shared/types/product";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, thunkAPI) => {
        // '_' - это пропуск параметра
        const response = await axios.get<Product[]>(
            "https://api.escuelajs.co/api/v1/products",
        );
        return response.data;
    },
);
