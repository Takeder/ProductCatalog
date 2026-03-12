import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import { fetchProducts } from "./store/reducers/actionCreators";
import { ProductCard } from "./components/ProductCard/ProductCard";
import styles from "./App.module.css";

const App = () => {
    const dispatch = useAppDispatch(); // Инструмент для отправки команд в Redux
    // Достаем данные из Redux
    const { items, isLoading, error } = useAppSelector(
        (state) => state.product,
    );

    useEffect(() => {
        dispatch(fetchProducts()); // При первом запуске страницы просим данные у сервера
    }, [dispatch]);

    if (isLoading) return <div className={styles.loader}>Загрузка...</div>;
    if (error) return <div className={styles.error}>Ошибка: {error}</div>;

    return (
        <main className={styles.container}>
            <div className={styles.grid}>
                {items.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </main>
    );
};

export default App;
