import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import productReducer from "./reducers/productSlice";

const rootReducer = combineReducers({
    product: productReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

// Создаем типизированные версии хуков для использования в компонентах

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
