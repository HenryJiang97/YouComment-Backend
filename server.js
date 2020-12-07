const express = require('express');
const cors = require('cors');
const userRouter = require('./router/user');
const commentRouter = require('./router/comment');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
const mongoDBEndpoint = "mongodb+srv://HenryJiang:hanhuajiang@cluster0.mhawq.mongodb.net/youcomment?retryWrites=true&w=majority";
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to mongo db'));

// Use API
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);

// Port setup
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("starting at" + port);
})