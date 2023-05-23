import { renderProductList } from './render-product-list.js';

async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        renderProductList(data.products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

export { fetchProducts };