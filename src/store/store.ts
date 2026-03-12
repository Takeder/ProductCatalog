import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";

const rootReducers = combineReducers({ productReducer });
export const setupStore = () => {
    return configureStore({
        reducer: rootReducers,
    });
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
