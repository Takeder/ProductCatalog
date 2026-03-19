import { useAppSelector, useAppDispatch } from "../store/store";
// Импортируем addToCart (для плюса) и decrementQuantity (для минуса)
import {
  removeFromCart,
  addToCart,
  decrementQuantity,
} from "../store/reducers/cartSlice";
import { Link } from "react-router-dom";
import styles from "./CartPage.module.css";

// Страница корзины

export const CartPage = () => {
  const { items } = useAppSelector((state) => state.cart); // Достаем список товаров из корзины
  const dispatch = useAppDispatch();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0); // Считаем общую сумму: (цена * количество) для каждой позиции

  console.log("tst-branch");

  return (
    <div className={styles.container}>
      <h1>Корзина</h1>
      {items.length === 0 ? (
        <p>
          Пусто.
          <Link to="/" className={styles.back}>
            В магазин
          </Link>
        </p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <div>
                <span className={styles.infoName}>{item.title}</span>

                {/* КНОПКИ СЧЕТЧИКА */}
                <div className={styles.counter}>
                  <button
                    className={styles.countBtn}
                    onClick={() => dispatch(decrementQuantity(item.id))}
                  >
                    -
                  </button>

                  <span className={styles.quantity}>{item.quantity}</span>

                  <button
                    className={styles.countBtn}
                    onClick={() => dispatch(addToCart(item))}
                  >
                    +
                  </button>
                </div>

                <span className={styles.infoMeta}>
                  Цена: ${item.price * item.quantity}
                </span>
              </div>

              <button
                className={styles.removeBtn}
                onClick={
                  () => dispatch(removeFromCart(item.id)) // Кнопка удаления всей позиции
                }
              >
                Удалить
              </button>
            </div>
          ))}
          <div className={styles.total}>Итого: ${total.toFixed(2)}</div>
          <Link to="/" className={styles.back}>
            ← Назад к покупкам
          </Link>
        </>
      )}
    </div>
  );
};
