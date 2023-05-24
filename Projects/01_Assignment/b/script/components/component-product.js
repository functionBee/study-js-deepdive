import { createAnchor, createImage, createHTMLElement } from '../helpers/element-helpers.js';

function createProductComponent(product) {
    const listItemStyle = ['max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg', 'mt-10'];
    const figureStyle = ['relative', 'before:absolute', 'before:content-[""]', 'before:block', 'before:w-full', 'before:h-full', 'before:bg-black/40'];
    const imgStyle = ['w-full', 'h-40', 'object-cover', 'object-center'];
    const detailsDivStyle = ['relative', 'px-6', 'py-4'];
    const brandStyle = ['bg-gray-200', 'rounded-full', 'px-3', 'py-1', 'text-sm', 'font-semibold', 'text-gray-700'];
    const productStyle = ['text-black', 'hover:underline'];
    const productTitleStyle = ['block', 'text-xl', 'mt-2'];
    const productDescriptionStyle = ['text-gray-700', 'text-base'];
    const srOnlyStyle = ['sr-only'];
    const cardPriceInfo = ['mt-3', 'text-lg', 'font-bold', 'text-black', 'text-right'];
    const cardDiscountPriceInfo = ['text-rose-600', 'text-3xl', 'font-bold', 'text-right'];
    
    const listItem = createHTMLElement('li', listItemStyle);
    const figure = createHTMLElement('figure', figureStyle);
    const img = createImage(imgStyle, product.thumbnail, null, product.title, 384, 158, 'lazy');
    const detailsDiv = createHTMLElement('div', detailsDivStyle);
    const brandSpan = createHTMLElement('span', brandStyle, product.brand);
    const productLink = createAnchor(productStyle, '#');
    const productTitle = createHTMLElement('strong', productTitleStyle, product.title);
    const productDescription = createHTMLElement('p', productDescriptionStyle, product.description);
    const priceParagraph = createHTMLElement('p', cardPriceInfo);
    const priceLabelSpan = createHTMLElement('span', srOnlyStyle, '가격: ');
    const discountParagraph = createHTMLElement('p', cardDiscountPriceInfo);
    const discountLabelSpan = createHTMLElement('span', srOnlyStyle, '할인가: ');
    
    figure.appendChild(img);
    listItem.appendChild(figure);
    detailsDiv.appendChild(brandSpan);
    productLink.appendChild(productTitle);
    productLink.appendChild(productDescription);
    detailsDiv.appendChild(productLink);
    priceParagraph.appendChild(priceLabelSpan);
    priceParagraph.innerHTML += `${product.price},000원`; // TODO: 원가 - 할인가 = 판매가, $->원화
    detailsDiv.appendChild(priceParagraph);
    discountParagraph.appendChild(discountLabelSpan);
    discountParagraph.innerHTML += `${product.discountPercentage}%`;
    detailsDiv.appendChild(discountParagraph);
    listItem.appendChild(detailsDiv);
    
    return listItem;
}

export {createProductComponent}