const mongoose = require('mongoose');

const CommentSchema = require('./comment.schema').CommentSchema;
const CommentModel = mongoose.model("Commnet", CommentSchema);
mongoose.set('useFindAndModify', false);

// Insert a new comment to the database
function insertComment(comment) {
    return CommentModel.create(comment);
}

// Get all comments in the database
function getAllComment() {
    return CommentModel.find().exec();
}

// Find comment written by certain user
function findCommentByUser(userId) {
    return CommentModel.findOne({posterId: userId}).exec();
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
    getAllComment,
    findCommentByUser,
    editCommentContent,
    editCommentRating,
    deleteComment
}
