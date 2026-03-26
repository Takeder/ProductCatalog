import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSortBy, type SortOption } from "../../store/reducers/productSlice";
import styles from "./SortControls.module.css";

export const SortControls = () => {
    const dispatch = useAppDispatch();
    const currentSort = useAppSelector((state) => state.product.sortBy);

    return (
        <div className={styles.sortWrapper}>
            <span>Сортировать: </span>
            <select
                value={currentSort}
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
