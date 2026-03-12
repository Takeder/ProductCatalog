// Импортируем функцию для создания асинхронных экшенов
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Тип данных нашего продукта
import { type Product } from "../../shared/types/product";

// Создаем экшен 'products/fetchAll'. Вторым аргументом идет асинхронная функция (callback)
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
    // Делаем GET запрос. <Product[]> говорит, что мы ожидаем массив объектов типа Product
    const res = await axios.get<Product[]>(
        "https://api.escuelajs.co/api/v1/products",
    );
    // Возвращаем данные из ответа (они попадут в action.payload в слайсе)
    return res.data; // Данные попадают в 'payload' экшена fulfilled
});
