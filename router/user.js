const { response } = require('express');
const express = require('express');
const { 
    insertUser,
    getAllUsers,
    findUserById,
    addComment,
    editName,
    deleteUser
} = require('../db/user.model');
const router = express.Router();


// Get all users
router.get('/', function(req, res) {
    return getAllUsers()
        .then(
            (response) => res.status(200).send(response),
            (error) => res.status(404).send("Error getting users")
        );
});


// Get user by id
router.get('/:id', function(req, res) {
    return findUserById(req.params.id)
    .then(
        (response) => res.status(200).send(response),
        (error) => res.status(404).send("Error getting user")
    );
});


// Insert new user
router.post('/', function(req, res) {
    const user = {
        id: req.body.id,
        email: req.body.email,
        name: req.body.name,
        type: req.body.usertype,
        comments: []
    };

    insertUser(user)
    .then(function (response) {
        return res.status(200).send(response);
    }, function (error) {
        return res.status(500).send("Issue adding user");
    })
    .then(function () {
        console.log("Added user successfully!")
    })
    .catch(function() {
        console.error("Couldn't add user")
    })
});


// Add comment to user
router.put('/comment/:id/:comment', function(req, res) {
    addComment(req.query.id, req.params.comment)
    .then(function (response) {
        return res.status(200).send(response);
    }, function (error) {
        return res.status(500).send("Issue updating comments list");
    })
    .then(function () {
        console.log("Updated comments list successfully!")
    })
    .catch(function() {
        console.error("Couldn't update comments list")
    })
});


// Edit user name
router.put('/name/:id/:name', function(req, res) {
    const user = findUserById(req.params.id);
    user.name = req.params.name;
    return editName(req.params.id, user)
        .then(
            (response) => res.status(200).send(response),
            (error) => res.status(404).send("Cannot edit user name")
        );
});

// Delete user
router.delete('/:id', function(req, res) {
    return deleteUser(req.params.id)
        .then(
            (response) => res.status(200).send(response),
            (error) => res.status(404).send("No certain user in the db")
        );
});


module.exports = router;