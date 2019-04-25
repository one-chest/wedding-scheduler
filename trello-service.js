const axios = require('axios');
const extractor = require('./extractor');
const guestService = require('./guest-service');

const url = process.env.FETCH_TRELLO_CARDS_URL;

function parseToObj(id, cardName, cardDesc) {
    return {
        cardId: id,
        name: extractor.extractName(cardName),
        extras: extractor.extractExtras(cardName),
        email: extractor.extractEmail(cardDesc),
        phone: extractor.extractPhoneNumber(cardDesc),
        greeting: extractor.extractGreeting(cardName)
    }
}

function findCard(cardId, serviceInfo) {
    const a = serviceInfo.filter(fromService => fromService.cardId === cardId);
    if (a) {
        return a[0];
    }
}

function updateCards(fromTrello, fromService) {
    if (!fromService) {
        return guestService.saveGuest(fromTrello);
    } else {
        if (!fromService.approved) {
            return guestService.updateGuest(fromService.code, fromTrello);
        }
    }
}

function updateGuests() {
    Promise.all([fetchGuests(), guestService.fetchGuests()])
        .then(values => {
            const [trelloInfo, serviceInfo] = values;

            trelloInfo.forEach(fromTrello => {
                const fromService = findCard(fromTrello.cardId, serviceInfo);
                return updateCards(fromTrello, fromService);
            });
        }).catch(e => console.error(e.message));
}

function fetchGuests() {
    return axios.get(url)
        .then(response => {
                return response.data
                    .map(card => parseToObj(card.id, card.name, card.desc));
            }
        )
}

module.exports = {fetchGuests, updateGuests};
