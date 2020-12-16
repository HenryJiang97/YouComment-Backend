const { response } = require('express');
const express = require('express');
const {
    findPopularVideo,
    editCommentCount,
} = require('../db/commentCount.model');
const router = express.Router();

// Get most popular video
router.get('/', function(req, res) {
    return findPopularVideo()
    .then(
        (response) => res.status(200).send(response),
        (error) => res.status(404).send("Error getting popular video")
    );
});

// Add count
router.put('/add/:videoid', function(req, res) {
    console.log("VIDEO ID", req.params.videoid);
    editCommentCount(req.params.videoid, 1)
    .then(function (response) {
        return res.status(200).send(response);
    }, function (error) {
        return res.status(500).send("Issue updating CommentCount");
    })
    .then(function () {
        console.log("Updated CommentCount successfully!")
    })
    .catch(function() {
        console.error("Couldn't update CommentCount")
    })
});


module.exports = router;