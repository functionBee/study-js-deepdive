import { createSpan, createAnchor, createStrong, createParagraph } from './element-helpers.js';

function renderProductList(products) {
    const productListContainer = document.getElementById('prodList');
    productListContainer.classList.add('ml-auto', 'mr-auto', 'w-fit')

    // 기존 제품 목록 지우기
    clearProductList();

    products.forEach((product) => {
        const listItem = document.createElement('li');
        listItem.classList.add('max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg', 'mt-10');

        const figure = document.createElement('figure');

        const img = document.createElement('img');
        img.src = product.thumbnail;
        img.alt = product.title;
        img.width = 384;
        img.height = 158;
        img.loading = 'lazy';
        img.classList.add('w-full', 'h-40', 'object-cover', 'object-center');
        figure.appendChild(img);
        listItem.appendChild(figure);

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('px-6', 'py-4');

        const brandSpan = createSpan('inline-block', 'bg-gray-200', 'rounded-full', 'px-3', 'py-1', 'text-sm', 'font-semibold', 'text-gray-700');
        brandSpan.textContent = product.brand;
        detailsDiv.appendChild(brandSpan);

        const productLink = createAnchor('text-black', 'hover:underline');
        const productTitle = createStrong('block', 'text-xl', 'mb-2');
        productTitle.textContent = product.title;
        const productDescription = createParagraph('text-gray-700', 'text-base');
        productDescription.textContent = product.description;
        productLink.appendChild(productTitle);
        productLink.appendChild(productDescription);
        detailsDiv.appendChild(productLink);

        const priceParagraph = createParagraph('text-gray-700');
        const priceLabelSpan = createSpan('font-semibold');
        priceLabelSpan.textContent = '가격: ';
        priceParagraph.appendChild(priceLabelSpan);
        priceParagraph.innerHTML += `${product.price.toLocaleString()}원`;
        detailsDiv.appendChild(priceParagraph);

        const discountParagraph = createParagraph('text-gray-700');
        const discountLabelSpan = createSpan('font-semibold');
        discountLabelSpan.textContent = '할인%: ';
        discountParagraph.appendChild(discountLabelSpan);
        discountParagraph.innerHTML += `${product.discountPercentage.toFixed(2)}%`;
        detailsDiv.appendChild(discountParagraph);

        listItem.appendChild(detailsDiv);
        productListContainer.appendChild(listItem);
    });
}

function clearProductList() {
    const productListContainer = document.getElementById('prodList');
    productListContainer.innerHTML = '';
}
export { renderProductList };
