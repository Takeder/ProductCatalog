export interface Product {
    id: number; // Уникальный идентификатор товара
    title: string; // Название товара
    price: number; // Цена товара
    description: string; // Описание товара
    images: string[]; // Массив ссылок на изображения
    category: {
        // Объект категории
        id: number; // ID категории
        name: string; // Название категории
        image: string; // Изображение категории
    };
}
