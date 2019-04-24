const axios = require('axios');

const url = process.env.FETCH_GUEST_URL;

function saveGuest(data) {
    console.debug(`Saving guest ${data.name}`);
    return axios.post(url, data)
        .then(response => console.log(`${response.data.name} saved!`));
}

function fetchGuests() {
    return axios.get(url).then(response => response.data);
}

module.exports = {fetchGuests, saveGuest};
