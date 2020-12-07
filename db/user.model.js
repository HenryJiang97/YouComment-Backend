const mongoose = require('mongoose');

const CommentSchema = require('./user.schema').UserSchema;
const UserModel = mongoose.model("User", CommentSchema);
mongoose.set('useFindAndModify', false);

// Insert a new comment to the database
function insertUser(user) {
    return UserModel.create(user);
}

// Get all comments in the database
function getAllUsers() {
    return UserModel.find().exec();
}

// Find comment written by certain user
function findUserById(userId) {
    return UserModel.findOne({id: userId}).exec();
}

// Add comment to user
function addComment(userId, comment) {
    UserModel.findOne({id: userId}, function(err, user) {
        if (err) {
            return err;
        }
        let comments = user.comments;
        comments.push(comment);
        return UserModel.findOneAndUpdate({id: userId}, {comments: comments}, {upsert: true}).exec();
    });
}

// Delete comment by id
function deleteUser(userId) {
    return UserModel.findOneAndDelete({id: userId}).exec();
}


module.exports = {
    insertUser,
    getAllUsers,
    findUserById,
    addComment,
    deleteUser
}
