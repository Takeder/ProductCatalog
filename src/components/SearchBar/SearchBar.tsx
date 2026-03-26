// src/components/SearchBar/SearchBar.tsx
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSearchQuery } from "../../store/reducers/productSlice";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
    const dispatch = useAppDispatch();
    // Берем текущий запрос из стора
    const query = useAppSelector((state) => state.product.searchQuery);

    return (
        <div className={styles.searchWrapper}>
            <input
                type="text"
                placeholder="Поиск товаров..."
                value={query}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className={styles.input}
            />
            {/* Кнопка очистки (появляется если что-то введено) */}
            {query && (
                <button
                    className={styles.clear}
                    onClick={() => dispatch(setSearchQuery(""))}
                >
                    ✕
                </button>
            )}
        </div>
    );
};
