const db = require('./connection');
const bcrypt = require('bcryptjs');


function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

async function signUp(email, password, first_name, last_name) {
    const hash = createHash(password);
    const returningId = await db.one("insert into users(email, hash, first_name, last_name) values ( $1, $2, $3, $4) returning id", [email, hash, first_name, last_name]);
    return returningId;
}


async function login(email, password) {
    const user = await getByEmail(email);
    return bcrypt.compareSync(password, user.hash);
}



async function getByEmail(email) {
    const userEmail = await db.one(`
    select * from users where email=$1
    `, [email]);
    return userEmail;
}

async function getUser(id) {
    try {
        const user = await db.one(`
        select * from users where id=$1
        `, [id]);
        return user;
    } catch (err) {
        return null;
    };
}

async function updateUserData(id, email, first_name, last_name) {
    const result = await db.result(`
    update users set
    email=$2,
    first_name=$3,
    last_name=$4
   where id=$1; 
   `, [id, email, first_name, last_name]);
    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
}

module.exports = {
    createHash,
    signUp,
    login,
    getByEmail,
    // getById,
    updateUserData,

}