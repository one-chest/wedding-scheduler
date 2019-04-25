const axios = require('axios');

const url = process.env.GUEST_URL;

function saveGuest(data) {
    console.debug(`Saving guest ${data.name}`);
    return axios.post(url, data)
        .then(response => console.log(`${response.data.name} saved!`));
}

function updateGuest(code, data) {
    console.debug(`Updating guest ${data.name}`);
    return axios.patch(url, {code, ...data})
        .then(response => {
            if (response.data.modified === true) {
                console.log(`${data.name} updated!`);
            }
        });
}

function fetchGuests() {
    return axios.get(url).then(response => response.data);
}

module.exports = {fetchGuests, saveGuest, updateGuest};
