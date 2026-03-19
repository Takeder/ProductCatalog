import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../../shared/types/product";

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart", // Имя слайса для инструментов разработчика
    initialState,
    reducers: {
        // Добавление товара или увеличение счетчика (+)
        addToCart: (state, action: PayloadAction<Product>) => {
            const item = state.items.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        // Уменьшение количества (-)
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    // Если товар один, при уменьшении удаляем его из корзины
                    state.items = state.items.filter(
                        (i) => i.id !== action.payload,
                    );
                }
            }
        },
        // Полное удаление позиции
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },
        // Очистка всей корзины
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, decrementQuantity, removeFromCart, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
