import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Обертка, которая дает доступ к Redux
import { store } from "./store/store"; // Наш созданный объект стора
import App from "./App";
import "./index.css"; // Глобальные стили

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        {/* Передаем стор всему приложению */}
        <App />
    </Provider>,
);
