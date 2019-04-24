const axios = require('axios');
const extractor = require('./extractor');

function extrasToNum(extras) {
    if (!extras) {
       return undefined;
    }
    return parseInt(extras);
}

function parseToObj(cardName, cardDesc) {
    return {
        name: extractor.extractName(cardName),
        extras: extrasToNum(extractor.extractExtras(cardName)),
        email: extractor.extractEmail(cardDesc),
        phone: extractor.extractPhoneNumber(cardDesc),
    }
}

function updateGuests() {
    throw new Error("Not implemented")
}

function fetchGuests() {
    return axios.get(url)
        .then(response => response.data
            .map(card => parseToObj(card.name, card.desc))
        )
}

module.exports = {fetchGuests, updateGuests};
