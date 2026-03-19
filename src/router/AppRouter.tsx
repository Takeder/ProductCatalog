import { Routes, Route } from "react-router-dom";
import App from "../App";
import { CartPage } from "../pages/CartPage";
import styles from "../App.module.css"; // Используем общий контейнер для ошибок

export const AppRouter = () => {
    return (
        <Routes>
            {/* Главная страница со списком товаров */}
            <Route path="/" element={<App />} />

            {/* Страница корзины со счетчиками */}
            <Route path="/cart" element={<CartPage />} />

            {/* Заглушка для несуществующих страниц */}
            <Route
                path="*"
                element={
                    <div className={styles.container}>
                        <h1>404: Страница не найдена</h1>
                    </div>
                }
            />
        </Routes>
    );
};
