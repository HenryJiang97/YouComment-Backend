const mongoose = require('mongoose');

exports.CommentCountSchema = new mongoose.Schema({
    videoId: String,
    count: Number
}, {
    collection: 'commentcount'
});