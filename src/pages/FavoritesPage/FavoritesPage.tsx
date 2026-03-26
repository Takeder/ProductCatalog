// src/pages/FavoritesPage.tsx
import { useAppSelector } from "../../store/store";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import styles from "./FavoritesPage.module.css";
import appStyles from "../../App.module.css";

export const FavoritesPage = () => {
    const { items } = useAppSelector((state) => state.favorites);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Избранное</h1>
                <Link to="/" className={styles.cartLink}>
                    Назад в магазин
                </Link>
            </header>

            {items.length === 0 ? (
                <p>Вы еще ничего не добавили в избранное 💔</p>
            ) : (
                <div className={appStyles.grid}>
                    {items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};
