const axios = require('axios');
const extractor = require('./extractor');

function parseToObj(str) {
    return {
        name: extractor.extractName(str),
        extras: extractor.extractExtras(str),
        email: extractor.extractEmail(str),
        phone: extractor.extractPhoneNumber(str),
    }
}

function updateGuests() {
    throw new Error("Not implemented")
}

function fetchGuests() {
    return axios.get(url)
        .then(response => response.data
            .map(it => it.name)
            .map(it => parseToObj(it))
        )
}

module.exports = {fetchGuests, updateGuests};
