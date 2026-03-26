import { type Product } from "../../shared/types/product";
import { useAppDispatch, useAppSelector } from "../../store/store"; // Добавили useAppSelector
import { addToCart } from "../../store/reducers/cartSlice";
import { toggleFavorite } from "../../store/reducers/favoritesSlice";
import styles from "./ProductCard.module.css";

//Карточка товара

// Принимаем данные одного товара
export const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useAppDispatch(); // Функция для отправки команд (экшенов)

    // Проверяем, есть ли этот товар уже в корзине
    const isInCart = useAppSelector((state) =>
        state.cart.items.some((item) => item.id === product.id),
    );

    // Проверяем, в избранном ли товар
    const isFavorite = useAppSelector((state) =>
        state.favorites.items.some((i) => i.id === product.id),
    );

    return (
        <div className={styles.card}>
            <button
                className={`${styles.favBtn} ${isFavorite ? styles.active : ""}`}
                onClick={() => dispatch(toggleFavorite(product))}
            >
                {isFavorite ? "❤️" : "🤍"}
            </button>
            <img
                src={product.images[0]}
                alt={product.title}
                className={styles.image}
            />
            <h3 className={styles.title}>{product.title}</h3>
            <div className={styles.footer}>
                <span className={styles.price}>${product.price}</span>
                <button
                    className={styles.button}
                    onClick={() => dispatch(addToCart(product))} // При клике отправляем товар в корзину
                    disabled={isInCart} // Блокируем кнопку
                >
                    {isInCart ? "В корзине" : "Купить"}
                </button>
            </div>
        </div>
    );
};
