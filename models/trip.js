const db = require('./connection');
const { dateToFormattedString } = require('../utils');

async function allTrips() {
    try {
        const thetrips = await db.any(`select * from trips;`);
        console.log(thetrips);
        return theTrips;
    } catch (err) {
        console.log(err)
        return [];
    }
}

async function getTrip(id) {
    try {
        const oneTrip = await db.one(`select * from trips where id=$1`, [id]);
        return oneTrip;
    } catch (err) {
        return null;
    }
}

async function getAllTripsByUserId(userId) {
    try {
        const theTrips = await db.any(`select * from trips where user_id=$1`, [userId]);
        console.log(theTrips)
        return theTrips;
    } catch (err) {
        console.log(err)
        return [];
    }
}


async function createTrip(location, day, lat, long, user_id) {
    const result = await db.one(`
insert into trips
    (location, day, lat, long, user_id)
values
    ($1, $2, $3, $4, $5)    
returning id
    `, [location, day, lat, long, user_id]);

    return result.id;
};

async function updateTrip(id, location, day) {
    const result = await db.result(`
        update trips set
            location=$2,
            time=$3,          
        where id=$1;
    `, [id, location, day]);
    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
}

module.exports = {
    allTrips,
    getTrip,
    getAllTripsByUserId,
    createTrip,
    updateTrip
}