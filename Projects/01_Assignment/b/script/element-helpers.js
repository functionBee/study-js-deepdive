function createAnchor(classNames, href, target, title, rel) {
    const link = document.createElement('a');
    link.classList.add(...classNames);
    link.href = href;
    if (target !== null) {
        link.target = target;
    }
    if (title !== null) {
        link.title = title;
    }
    if (rel !== null) {
        link.rel = rel;
    }
    return link;
}

function createButton(classNames, textContent, title, type, dataValues) {
    const button = document.createElement('button');
    button.classList.add(...classNames);
    button.textContent = textContent;
    button.setAttribute('title', title);
    button.setAttribute('data' + type, ...dataValues);
    return button;
}

function createTypographyElement(tagName, classNames, textContent) {
    const element = document.createElement(tagName);
    element.classList.add(...classNames);
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

function createHeading(level, classNames, textContent) {
    const tagName = 'h' + level;
    return createTypographyElement(tagName, classNames, textContent);
}

export { createAnchor, createButton, createTypographyElement, createHeading };