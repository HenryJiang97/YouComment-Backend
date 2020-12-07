const { response } = require('express');
const express = require('express');
const { 
    insertComment,
    getAllComments,
    findCommentById,
    findCommentByVideoId,
    editCommentContent,
    editCommentRating,
    deleteComment
} = require('../db/comment.model');
const router = express.Router();


// Get all comments
router.get('/', function(req, res) {
    return getAllComments()
        .then(
            (response) => res.status(200).send(response),
            (error) => res.status(404).send("Error getting comments")
        );
});


// Get comment by id
router.get('/:id', function(req, res) {
    return findCommentById(req.params.id)
    .then(
        (response) => res.status(200).send(response),
        (error) => res.status(404).send("Error getting comment")
    );
});


// Get comment by video id
router.get('/:id', function(req, res) {
    return findCommentByVideoId(req.params.id)
    .then(
        (response) => res.status(200).send(response),
        (error) => res.status(404).send("Error getting comment based on the video id")
    );
});


// Insert new comment
router.post('/', function(req, res) {
    const comment = {
        id: req.body.id,
        rating: req.body.rating,
        content: req.body.content,
        videoId: req.body.videoId,
        posterId: req.body.posterId
    };

    insertComment(comment)
    .then(function (response) {
        return res.status(200).send(response);
    }, function (error) {
        return res.status(500).send("Issue adding comment");
    })
    .then(function () {
        console.log("Added comment successfully!")
    })
    .catch(function() {
        console.error("Couldn't add comment")
    })
});


// Edit comment content
router.put('/:content', function(req, res) {
    editCommentContent(req.query.id, req.params.content)
    .then(function (response) {
        return res.status(200).send(response);
    }, function (error) {
        return res.status(500).send("Issue updating comment content");
    })
    .then(function () {
        console.log("Updated comment content successfully!")
    })
    .catch(function() {
        console.error("Couldn't update comment content")
    })
});


// Edit comment rating
router.put('/:rating', function(req, res) {
    editCommentRating(req.query.id, req.params.rating)
    .then(function (response) {
        return res.status(200).send(response);
    }, function (error) {
        return res.status(500).send("Issue updating comment rating");
    })
    .then(function () {
        console.log("Updated comment rating successfully!")
    })
    .catch(function() {
        console.error("Couldn't update comment rating")
    })
});


// Delete comment
router.delete('/:id', function(req, res) {
    return deleteComment(req.params.id)
        .then(
            (response) => res.status(200).send(response),
            (error) => res.status(404).send("No certain comment in the db")
        );
});


module.exports = router;