const mongoose = require('mongoose');


exports.CommentSchema = new mongoose.Schema({
    id: String,
    rating: Number,
    content: String,
    videoId: String,
    posterId: String
}, {
    collection: 'comment'
});