const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/mongo_db_connectivity');
const User = db.User;

module.exports.authenticate = async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return _.omit({
            ...user.toJSON(),
            token
        },'password');
    }
}

module.exports.getById = async (id) => {
}

module.exports.create = async (userParam) => {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}