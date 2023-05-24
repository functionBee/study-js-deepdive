function createHTMLElement(tagName, classNames, textContent) {
    const element = document.createElement(tagName);
    element.classList.add(...classNames);
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

function createAnchor(classNames, href, target, title, rel) {
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
    return link;
}

function createButton(classNames, textContent, title, type) {
    const button = createHTMLElement('button', classNames, textContent);
    button.setAttribute('title', title);
    if (target !== null) {
        for (const key in type) {
            button.setAttribute('data-' + key, type[key]);
        }
    }
    
    return button;
}

function createHeading(level, classNames, textContent) {
    const tagName = 'h' + level;
    return createHTMLElement(tagName, classNames, textContent);
}

export { createAnchor, createButton, createHeading, createHTMLElement };