const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogList = new Schema({
    author: ObjectId,
    title: String,
    body: String,
    date: Date
});

exports.BlogList = mongoose.model('BlogList', BlogList);
