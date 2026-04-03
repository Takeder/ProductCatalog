import { useEffect } from "react";
// Типизированные хуки для работы со Store
import { useAppDispatch, useAppSelector } from "./store/store";
// Асинхронный экшен загрузки товаров
import { fetchProducts } from "./store/reducers/actionCreators";
// Селекторы, экспортированные напрямую из productSlice.selectors
import {
    selectDisplayItems,
    selectSearchQuery,
} from "./store/reducers/productSlice";
// Селектор из favoritesSlice
import { selectedFavoritesCount } from "./store/reducers/favoritesSlice";
// Компоненты интерфейса
import { ProductCard } from "./components/ProductCard/ProductCard";
import { SortControls } from "./components/SortControls/SortControls";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
// Стили
import styles from "./App.module.css";

const App = () => {
    const dispatch = useAppDispatch();

    const displayItems = useAppSelector(selectDisplayItems);
    const searchQuery = useAppSelector(selectSearchQuery);

    // Статусы загрузки и ошибок напрямую из стейта
    const { isLoading, error } = useAppSelector((state) => state.product);

    // Данные для счетчиков в шапке
    const favCount = useAppSelector(selectedFavoritesCount);
    const cartCount = useAppSelector((state) =>
        state.cart.items.reduce((acc, i) => acc + i.quantity, 0),
    );

    /**
     * 2. ЭФФЕКТЫ
     * Загружаем товары один раз при монтировании компонента.
     */
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    /**
     * 3. ОБРАБОТКА СОСТОЯНИЙ (Loading / Error)
     */
    if (isLoading) {
        return <div className={styles.status}>Загрузка каталога...</div>;
    }

    if (error) {
        return (
            <div className={styles.status} style={{ color: "red" }}>
                <p>{error}</p>
                <button
                    className={styles.retryBtn}
                    onClick={() => dispatch(fetchProducts())}
                >
                    Повторить попытку
                </button>
            </div>
        );
    }

    /**
     * 4. ОСНОВНОЙ РЕНДЕР
     */
    return (
        <main className={styles.container}>
            {/* ШАПКА */}
            <header className={styles.header}>
                <h1 className={styles.logo}>Store IT</h1>

                <div className={styles.controls}>
                    <SearchBar />
                    <SortControls />

                    <Link to="/favorites" className={styles.cartLink}>
                        ❤️ <span className={styles.cartText}>Избранное</span>
                        <span className={styles.badge}>{favCount}</span>
                    </Link>

                    <Link to="/cart" className={styles.cartLink}>
                        🛒 <span className={styles.cartText}>Корзина</span>
                        <span className={styles.badge}>{cartCount}</span>
                    </Link>
                </div>
            </header>

            {/* СЕТКА ТОВАРОВ */}
            <section className={styles.grid}>
                {displayItems.length > 0 ? (
                    displayItems.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))
                ) : (
                    /* Сообщение о пустом результате поиска */
                    <div className={styles.noResults}>
                        <h3>По запросу "{searchQuery}" ничего не найдено</h3>
                        <p>Попробуйте сбросить фильтры или изменить запрос</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default App;
