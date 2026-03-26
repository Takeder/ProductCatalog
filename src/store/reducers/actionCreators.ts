import { createAsyncThunk } from "@reduxjs/toolkit"; // Импортируем функцию для создания асинхронных действий
import axios from "axios"; // Импортируем axios для выполнения HTTP-запросов
import { type Product } from "../../shared/types/product"; // Тип данных товара

/**
 * Асинхронный экшен для загрузки списка товаров с сервера.
 * Первый аргумент "products/fetchAll" — уникальный тип действия для Redux DevTools. Имя экшена для отладки
 * Второй аргумент — асинхронная функция (колбэк), выполняющая сам запрос.
 */
export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            // Выполняем GET-запрос. Указываем <Product[]>, чтобы TypeScript знал структуру ответа.
            const response = await axios.get<Product[]>(
                "https://api.escuelajs.co/api/v1/products",
            );

            // Если запрос успешен, возвращаем данные (они попадут в action.payload в слайсе)
            return response.data;
        } catch (error) {
            // Если произошла ошибка (например, сервер недоступен), "отклоняем" выполнение санкса.
            // rejectWithValue позволяет передать свое сообщение об ошибке в стейт.
            return rejectWithValue(
                "Ошибка при загрузке товаров. Проверьте соединение.",
            );
        }
    },
);
