const scheduler = require('node-schedule');
const trelloService = require("./trello-service");

function schedule() {
    scheduler.scheduleJob('*/5 * * * * *', () => trelloService.updateGuests());
}

console.log("===== Daemon started =====");

module.exports = {
    schedule
};
