const axios = require('axios');
const extractor = require('./extractor');

function parseToObj(name) {
    throw new Error("Not implemented")
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
