import { useEffect, useMemo } from "react";
// Типизированные хуки Redux
import { useAppDispatch, useAppSelector } from "./store/store";
// Асинхронный экшен для запроса к API
import { fetchProducts } from "./store/reducers/actionCreators";
//селекторы из слайса фэворит
import { selectedFavoritesCount } from "./store/reducers/favoritesSlice";
// Компоненты интерфейса
import { ProductCard } from "./components/ProductCard/ProductCard"; // Карточка товара
import { SortControls } from "./components/SortControls/SortControls"; // Выбор сортировки
import { SearchBar } from "./components/SearchBar/SearchBar"; // Поиск
import { Link } from "react-router-dom"; // Навигация
// Стили
import styles from "./App.module.css";

const App = () => {
    const favCount = useAppSelector(selectedFavoritesCount); // Число в избранном
    const dispatch = useAppDispatch(); // Для вызова экшенов

    // Извлекаем всё необходимое из состояния продуктов
    const { items, isLoading, error, sortBy, searchQuery } = useAppSelector(
        (state) => state.product,
    );

    // Считаем общее кол-во товаров в корзине (сумма всех quantity)
    const cartCount = useAppSelector((state) =>
        state.cart.items.reduce((acc, i) => acc + i.quantity, 0),
    );

    // Загружаем товары при первом рендере
    useEffect(() => {
        dispatch(fetchProducts()); // Запускаем загрузку товаров
    }, [dispatch]);

    /**
     * Обработка списка товаров (Фильтрация + Сортировка).
     * Используем useMemo, чтобы не пересчитывать список при каждом рендере,
     * а только когда меняются исходные данные, поисковый запрос или тип сортировки.
     */
    const displayItems = useMemo(() => {
        // 1. Фильтруем по поисковому запросу (без учета регистра)
        const filtered = items.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );

        // 2. Сортируем отфильтрованный результат
        // Используем [...filtered], так как .sort() мутирует массив
        // Сортируем копию массива
        return [...filtered].sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price; // Сначала дешевые
            if (sortBy === "price-high") return b.price - a.price; // Сначала дорогие
            if (sortBy === "title") return a.title.localeCompare(b.title); // А-Я
            return 0; // По умолчанию (как пришло с сервера)
        });
    }, [items, searchQuery, sortBy]); // Пересчет только при смене этих данных

    // Состояние загрузки
    if (isLoading) {
        return <div className={styles.status}>Загрузка каталога...</div>;
    }

    // Состояние ошибки
    if (error) {
        return (
            <div className={styles.status} style={{ color: "red" }}>
                {error}
            </div>
        );
    }

    return (
        <main className={styles.container}>
            {/* ШАПКА ПРИЛОЖЕНИЯ */}
            <header className={styles.header}>
                <h1 className={styles.logo}>Store IT</h1>

                <div className={styles.controls}>
                    {/* Поле поиска */}
                    <SearchBar />

                    {/* Выпадающий список сортировки */}
                    <SortControls />

                    {/* Ссылка на Избранное */}
                    <Link to="/favorites" className={styles.cartLink}>
                        ❤️ <span className={styles.cartText}>Избранное</span>
                        <span className={styles.badge}>{favCount}</span>
                    </Link>

                    {/* Ссылка в корзину со счетчиком */}
                    <Link to="/cart" className={styles.cartLink}>
                        🛒 <span className={styles.cartText}>Корзина</span>
                        <span className={styles.badge}>{cartCount}</span>
                    </Link>
                </div>
            </header>

            {/* ОСНОВНАЯ СЕТКА */}
            <section className={styles.grid}>
                {displayItems.length > 0 ? (
                    displayItems.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))
                ) : (
                    /* Сообщение, если поиск не дал результатов */
                    <div className={styles.noResults}>
                        <h3>По запросу "{searchQuery}" ничего не найдено</h3>
                        <p>
                            Попробуйте изменить параметры поиска или сортировки
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default App;
