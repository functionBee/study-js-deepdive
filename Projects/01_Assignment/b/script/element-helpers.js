function createSpan(classNames, textContent) {
    const span = document.createElement('span');
    span.classList.add(...classNames);
    span.textContent = textContent;
    return span;
}

function createStrong(classNames, textContent) {
    const strong = document.createElement('strong');
    strong.classList.add(...classNames);
    strong.textContent = textContent;
    return strong;
}

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

function createParagraph(classNames, textContent) {
    const paragraph = document.createElement('p');
    paragraph.classList.add(...classNames);
    if (textContent) {
        paragraph.textContent = textContent;
    }
    return paragraph;
}

export { createSpan, createAnchor, createStrong, createParagraph };