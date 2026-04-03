import { useAppDispatch, useAppSelector } from "../../store/store";
import {
    setSortBy,
    selectSortBy,
    type SortOption,
} from "../../store/reducers/productSlice";
import styles from "./SortControls.module.css";

export const SortControls = () => {
    const dispatch = useAppDispatch();

    // ПОЛУЧАЕМ ТЕКУЩУЮ СОРТИРОВКУ ИЗ СТОРА
    const currentSort = useAppSelector(selectSortBy);

    return (
        <div className={styles.sortWrapper}>
            <span>Сортировать: </span>
            <select
                value={currentSort} // Синхронизируем состояние стора с UI
                onChange={(e) =>
                    dispatch(setSortBy(e.target.value as SortOption))
                }
                className={styles.select}
            >
                <option value="default">По умолчанию</option>
                <option value="price-low">Сначала дешевые</option>
                <option value="price-high">Сначала дорогие</option>
                <option value="title">По названию (А-Я)</option>
            </select>
        </div>
    );
};
