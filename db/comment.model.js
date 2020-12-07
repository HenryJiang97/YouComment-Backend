const mongoose = require('mongoose');

const CommentSchema = require('./comment.schema').CommentSchema;
const CommentModel = mongoose.model("Commnet", CommentSchema);
mongoose.set('useFindAndModify', false);

// Insert a new comment to the database
function insertComment(comment) {
    return CommentModel.create(comment);
}

// Get all comments in the database
function getAllComments() {
    return CommentModel.find().exec();
}

// Find comment by id
function findCommentById(commentId) {
    return CommentModel.findOne({id: commentId}).exec();
}

// Find comment by video
function findCommentById(videoId) {
    return CommentModel.findOne({videoId: videoId}).exec();
}


// Edit comment content
function editCommentContent(commentId, content) {
    return CommentModel.findOneAndUpdate({id: commentId}, {content: content}, {upsert: true}).exec();
}

// Edit comment rating
function editCommentRating(commentId, rating) {
    return CommentModel.findOneAndUpdate({id: commentId}, {rating: rating}, {upsert: true}).exec();
}

// Delete comment by id
function deleteComment(commentId) {
    return CommentModel.findOneAndDelete({id: commentId}).exec();
}


module.exports = {
    insertComment,
    getAllComments,
    findCommentById,
    editCommentContent,
    editCommentRating,
    deleteComment
}
