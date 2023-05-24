function createHTMLElement(tagName, classNames, textContent) {
    const element = document.createElement(tagName);
    element.classList.add(...classNames);
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

function createAnchor(classNames, href, target, title, rel, datTypes) {
    const link = createHTMLElement('a', classNames);
    link.href = href;
    if (target) {
        link.target = target;
    }
    if (title) {
        link.title = title;
    }
    if (rel) {
        link.rel = rel;
    }
    if (datTypes){
        for (const key in datTypes) {
            link.setAttribute('data-' + key, datTypes[key]);
        }
    }
    return link;
}

function createButton(classNames, textContent, target, title, datTypes) {
    const button = createHTMLElement('button', classNames, textContent);
    button.setAttribute('target', target)
    button.setAttribute('title', title);
    if (datTypes) {
        for (const key in datTypes) {
            button.setAttribute('data-' + key, datTypes[key]);
        }
    }
    return button;
}

function createImage(classNames, src, srcset, alt, role, width, height, loading, decoding, fetchpriority) {
    const img = createHTMLElement('img', classNames);
    img.src = src;
    if (srcset) {
        img.srcset = srcset;
    }
    img.alt = alt;
    img.width = width;
    img.height = height;
    if (loading) {
        img.loading = loading;
    }
    if (decoding) {
        img.decoding = decoding;
    }
    if (fetchpriority) {
        img.setAttribute('fetchpriority', fetchpriority);
    }
    return img;
}

function createHeading(level, classNames, textContent) {
    const tagName = 'h' + level;
    return createHTMLElement(tagName, classNames, textContent);
}

export { createAnchor, createButton, createHeading, createImage, createHTMLElement };