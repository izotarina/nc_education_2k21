const zenCards = document.querySelector('#zenCards');
let itemNumber = 0;
let items;

(async function mainFunc() {
    items = await getJson();
    showCards();

    document.addEventListener('scroll', function() {
        const pageHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const windowInnerHeight = window.innerHeight;
        
        if (pageHeight < 600 + scrollTop + windowInnerHeight) {
            showCards(2);
        }
    })    
})();

async function /*Promise<json>*/ getJSONAsync(url) {
    let response = await fetch("https://obscure-scrubland-30498.herokuapp.com/" + url);
    if (response.ok) {
        let json = await response.json();
        return json;
    }
    else throw new Error(`${response.status}: ${response.statusText}`);
}

async function getJson() {
    let url = "https://zen.yandex.ru/api/v3/launcher/export?clid=300&country_code=ru";
    let json = await getJSONAsync(url);

    return json.items;
}

async function showCards(count = 6) {
    let cardsCount = 0;

    do {
        if (itemNumber == items.length) {
            items = await getJson();
            itemNumber = 0;
        }

        if (items[itemNumber].type == 'card' ||
            items[itemNumber].type == 'gif') {
            renderCard(items[itemNumber]);
            cardsCount++;
        } 

        itemNumber++;
    } while (cardsCount != count);
}

function renderCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.appendChild(createCardHeader(item.source));
    card.appendChild(createMainLink(item));
    card.appendChild(createFooter());

    zenCards.appendChild(card);
}

function createCardHeader(source) {
    const header = document.createElement('header');
    header.classList.add('card__header');

    header.appendChild(createCardHeaderTitle(source));
    header.appendChild(createCardControls());

    return header;
}

function createCardHeaderTitle(source) {
    const link = document.createElement('a');
    link.setAttribute('href', source.feed_share_link);
    link.classList.add('card__header-title');

    const img = document.createElement('img');
    img.setAttribute('src', source.logo);
    img.classList.add('card__header-img');

    const title = document.createElement('span');
    title.classList.add('card__header-title-text');
    title.innerText = source.title;

    link.appendChild(img);
    link.appendChild(title);

    return link;
}

function createCardControls() {
    const controls = document.createElement('div');
    controls.classList.add('card__controls');

    controls.appendChild(createCardIconLink('subscribe'));
    controls.appendChild(createCardIconLink('settings'));

    return controls;
}

function createCardIconLink(name) {
    const item = document.createElement('a');
    item.setAttribute('href', '#');
    item.classList.add('icon-link');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('icon-link__icon');

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    icon.setAttribute('href', '#icon-' + name);

    svg.appendChild(icon);
    item.appendChild(svg);

    return item;
}

function createMainLink(item) {
    const link = document.createElement('a');
    link.classList.add('card__link');
    link.setAttribute('href', item.link);

    link.appendChild(createImg(item.image));
    link.appendChild(createTitle(item.title));
    link.appendChild(createText(item.text));

    return link;
}

function createImg(src) {
    const img = document.createElement('img');
    img.classList.add('card__img');
    img.setAttribute('src', src);

    return img;
}

function createTitle(innerText) {
    const title = document.createElement('h4');
    title.classList.add('card__title');
    title.innerText = innerText;

    return title;
}

function createText(innerText) {
    const text = document.createElement('p');
    text.classList.add('card__text');
    text.innerText = innerText;

    return text;
}

function createFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('card__footer');

    const share = createCardIconLink('share');

    const shareText = document.createElement('span');
    shareText.classList.add('icon__link-text');
    shareText.innerText = 'Поделиться';

    share.classList.add('_share')
    share.appendChild(shareText);

    const estimates = document.createElement('div');
    estimates.classList.add('card__estimates');
    estimates.appendChild(createCardIconLink('like'));
    estimates.appendChild(createCardIconLink('dislike'));

    footer.appendChild(share);
    footer.appendChild(estimates);

    return footer;
}