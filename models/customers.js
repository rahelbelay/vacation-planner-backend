const db = require('./connection');

async function all() {
    try {

        const allEvents = await db.query(`select * from events`)
        console.log(allEvents);
        return allUsers;
    } catch (err) {
        console.log(err);
        return [];
    }
};

module.exports = {
    all
}

