const db = require('./connection');

async function getSavedPlace(id) {
    try {
        const oneSavedPlace = await db.one(`select * from saved_places where id=$1`, [id]);
        return oneSavedPlace;
    } catch (err) {
        return null;
    }
}
async function getAllSavedPlacedByTripId(id) {
    try {
        const theSavedPlaces = await db.any(`select * from saved_places where trip_id=$1`, [id]);
        console.log(theSavedPlaces)
        return theSavedPlaces;
    } catch (err) {
        console.log(err)
        return [];
    }
}


async function createPlace(name, type, latitude, longitude, pictureUrl, trip_id) {
    const result = await db.one(`
insert into saved_places
    (name, type, latitude, longitude, picture_url, trip_id)
values
    ($1, $2, $3, $4, $5, $6)    
returning id
    `, [name, type, latitude, longitude, pictureUrl, trip_id]);

    return result.id;
};

async function deletePlaceById(id) {
    try {
        const oneSavedPlace = await db.one(`delete from saved_places where id=$1`, [id]);
        return oneSavedPlace;
    } catch (err) {
        return null;
    }
}

module.exports = {
    getSavedPlace,
    getAllSavedPlacedByTripId,
    createPlace,
    deletePlaceById
}