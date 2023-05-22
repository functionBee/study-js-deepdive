function createSpan(className, textContent) {
    const span = document.createElement('span');
    span.classList.add(className);
    span.textContent = textContent;
    return span;
}

function createAnchor(className, href, target, title, rel) {
    const link = document.createElement('a');
    link.classList.add(className);
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

function createStrong(className, textContent) {
    const strong = document.createElement('strong');
    strong.classList.add(className);
    strong.textContent = textContent;
    return strong;
}

function createParagraph(className, textContent) {
    const paragraph = document.createElement('p');
    paragraph.classList.add(className);
    if (textContent) {
        paragraph.textContent = textContent;
    }
    return paragraph;
}

export { createSpan, createAnchor, createStrong, createParagraph };