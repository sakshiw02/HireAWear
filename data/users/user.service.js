const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {secret}  = require('../../config/config.json');
const db = require('../db');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getUserByMail,
    getUserByID,
    updatePassowrd
};

async function authenticate({ username, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.User.create(params);
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}
async function getUserByMail(email) {
    console.log("getUserByMail :: email -- "+email);
    const user = await db.User.scope('withHash').findOne({ where: {username: email } });
    console.log("getUserByMail :: email ", user);
    if (!user) return 'User not found';
    return user;
}

async function getUserByID(id) {
    const user = await db.User.scope('withHash').findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

async function updatePassowrd(id, password) {
    // hash password if it was entered
    let passwordhash = await bcrypt.hash(password, 10);
console.log("id : " +  id +" , password : " + password);
console.log("passwordhash : " +  passwordhash );
    
    await db.User.update({ hash : passwordhash },{ where : { id : id }});
    // const test = await user.create({ id: id });
    // await test.update({ hash: passwordhash });
    // await user.save();
    // return true;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}