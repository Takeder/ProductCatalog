import { type Product } from "../../shared/types/product";
import styles from "./ProductCard.module.css"; // Импорт стилей

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const imageUrl = product.images[0];

    return (
        <article className={styles.card}>
            <img src={imageUrl} alt={product.title} className={styles.image} />
            <span className={styles.category}>{product.category.name}</span>
            <h3 className={styles.title}>{product.title}</h3>

            <div className={styles.footer}>
                <span className={styles.price}>${product.price}</span>
                <button className={styles.button}>Купить</button>
            </div>
        </article>
    );
};
