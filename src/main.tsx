import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Компонент-обертка для связи React и Redux
import { BrowserRouter } from "react-router-dom"; // Обертка для работы навигации (роутинга)
import { store } from "./store/store"; // Импорт настроенного хранилища данных
import { AppRouter } from "./router/AppRouter"; // Импорт компонента со списком страниц// Импорт компонента со списком страниц
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </Provider>,
);
