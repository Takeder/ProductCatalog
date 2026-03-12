import React, { useEffect, useState } from "react";
import { type Product } from "./shared/types/product";
import { ProductCard } from "./components/ProductCard/ProductCard";
import styles from "./components/ProductCard/ProductCard.module.css";

const API_URL = "https://api.escuelajs.co/api/v1/products";

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error("Ошибка сети");
                const data: Product[] = await res.json();
                setProducts(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Ошибка загрузки",
                );
            }
        };
        loadData();
    }, []);

    if (error) return <div>Ошибка: {error}</div>;

    return (
        <main className={styles.grid}>
            {products.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </main>
    );
};

export default App;
