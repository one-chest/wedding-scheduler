const scheduler = require('node-schedule');
const trelloService = require("./trello-service");

const template = process.env.WEDDING_SCHEDULE_CRON_MASK || '*/5 * * * * *';

function schedule() {
    scheduler.scheduleJob(template, () => trelloService.updateGuests());
}

console.log("===== Daemon started =====");

module.exports = {
    schedule
};
