const mongoose = require('mongoose');
const { CommentSchema } = require('./comment.schema');

exports.UserSchema = new mongoose.Schema({
    id: String,
    email: String,
    name: String,
    type: String,
    comments: [CommentSchema]
}, {
    collection: 'user'
});