const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const urlRouter = require('./routes/url');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { resourceLimits } = require('worker_threads');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoDBEndpoint = "mongodb+srv://HenryJiang:hanhuajiang@cluster0.mhawq.mongodb.net/youcomment?retryWrites=true&w=majority";
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to mongo db'));

app.use(cors());
app.use('/api/url', urlRouter);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("starting at" + port);
})