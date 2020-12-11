const mongoose = require('mongoose');

const CommentSchema = require('./user.schema').UserSchema;
const UserModel = mongoose.model("User", CommentSchema);
mongoose.set('useFindAndModify', false);

// Insert a new user to the database
function insertUser(user) {
    return UserModel.create(user);
}

// Get all users in the database
function getAllUsers() {
    return UserModel.find().exec();
}

// Find user by id
function findUserById(userId) {
    return UserModel.findOne({id: userId}).exec();
}

// Add comment to user
function addComment(userId, comment) {
    UserModel.findOne({id: userId}, function(err, user) {
        if (err) {
            return err;
        }
        let newUser = user;
        newUser.comments.push(comment);
        return UserModel.findOneAndUpdate({id: userId}, newUser, {upsert: true}).exec();
    });
}

// Edit username
function editName(userId, user) {
    return UserModel.findOneAndUpdate({id: userId}, user, {upsert: true}).exec();
}

// Delete user by id
function deleteUser(userId) {
    return UserModel.findOneAndDelete({id: userId}).exec();
}


module.exports = {
    insertUser,
    getAllUsers,
    findUserById,
    addComment,
    editName,
    deleteUser
}
