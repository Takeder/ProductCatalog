import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import { fetchProducts } from "./store/reducers/actionCreators";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import styles from "./App.module.css";

const App = () => {
    const dispatch = useAppDispatch();
    const { items, isLoading, error } = useAppSelector(
        (state) => state.product,
    );
    const cartCount = useAppSelector((state) =>
        state.cart.items.reduce((acc, i) => acc + i.quantity, 0),
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (isLoading)
        return <div className={styles.status}>Загрузка товаров...</div>;
    if (error)
        return (
            <div className={styles.status} style={{ color: "red" }}>
                {error}
            </div>
        );

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1>Наш Магазин</h1>
                <Link to="/cart" className={styles.cartLink}>
                    🛒 Корзина ({cartCount})
                </Link>
            </header>

            <div className={styles.grid}>
                {items.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </main>
    );
};

export default App;
