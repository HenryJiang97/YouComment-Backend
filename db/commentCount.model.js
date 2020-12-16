const mongoose = require('mongoose');

const CommentCountSchema = require('./commentCount.schema').CommentCountSchema;
const CommentCountModel = mongoose.model("CommentCount", CommentCountSchema);
mongoose.set('useFindAndModify', false);

// Insert a new CommentCount to the database
function insertCommentCount(commentCount) {
    return CommentCountModel.create(commentCount);
}

// Get most popular video
function findPopularVideo() {
    return CommentCountModel.find().sort({count: -1}).limit(1);
}

// Edit CommentCount by count
function editCommentCount(videoId, delta) {
    console.log("EDIT COMMENT COUNT", videoId, delta);
    return CommentCountModel.findOne({videoId: videoId}, function(err, commentCount) {
        if (commentCount === null) {
            insertCommentCount({
                videoId: videoId,
                count: delta
            });
        } else {
            let newCommentCount = commentCount;
            newCommentCount.count += delta;
            CommentCountModel.findOneAndUpdate({videoId: videoId}, newCommentCount, {upsert: true}).exec();
        }
    }).exec();
}

module.exports = {
    findPopularVideo,
    editCommentCount,
}
