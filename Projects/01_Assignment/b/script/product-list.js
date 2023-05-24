import { createProductComponent } from './components/component-product.js'

function renderProductList(products) {
    const productListContainer = document.getElementById('prodList');
    productListContainer.classList.add('ml-auto', 'mr-auto', 'w-fit')

    // 기존 제품 목록 지우기
    clearProductList();

    products.forEach((product) => {
        const productComponent = createProductComponent(product);
        productListContainer.appendChild(productComponent); 
    });
}

function clearProductList() {
    const productListContainer = document.getElementById('prodList');
    productListContainer.innerHTML = '';
}

export { renderProductList };