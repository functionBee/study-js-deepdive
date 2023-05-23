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

        const brandStyle = ['bg-gray-200', 'rounded-full', 'px-3', 'py-1', 'text-sm', 'font-semibold', 'text-gray-700'];
        const brandSpan = createSpan(brandStyle, product.brand);
        detailsDiv.appendChild(brandSpan);

        const productStyle = ['text-black', 'hover:underline']
        const productLink = createAnchor(productStyle, '#', null, null, null);

        const productTitleStyle = ['block', 'text-xl', 'mt-2']
        const productTitle = createStrong(productTitleStyle, product.title);

        const productDescriptionStyle = ['text-gray-700', 'text-base']
        const productDescription = createParagraph(productDescriptionStyle, product.description);
        productLink.appendChild(productTitle);
        productLink.appendChild(productDescription);
        detailsDiv.appendChild(productLink);

        const srOnlyStyle = ['sr-only'];
        const cardPriceInfo = ['text-gray-700']

        const priceParagraph = createParagraph(cardPriceInfo);
        const priceLabelSpan = createSpan(srOnlyStyle, '가격: ');
        priceParagraph.appendChild(priceLabelSpan);
        priceParagraph.innerHTML += `${product.price},000원`;
        detailsDiv.appendChild(priceParagraph);

        const discountParagraph = createParagraph(cardPriceInfo);
        const discountLabelSpan = createSpan(srOnlyStyle, '할인가: ');
        discountParagraph.appendChild(discountLabelSpan);
        discountParagraph.innerHTML += `${product.discountPercentage}%`;
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
