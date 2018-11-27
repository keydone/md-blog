const mongoose = require('mongoose');
const { requires } = require('./validator');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    _id: {
        type: String,
        default: ObjectId,
    },
    name: {
        type: String,
        validate: requires('用户名'),
    },
    email: String,
    password: String,
    avatar: String,
});

module.exports = mongoose.model('User', userSchema);
