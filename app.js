require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});
const debug = require('debug')('makingsense:app');
const figlet = require('figlet');
const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = process.env;
const app = express();
const port = PORT || '3000';
const Post = require('./service/posts');
const postRouter = require('./routes/postRouter')(Post);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(process.env.API_VERSION, postRouter);

app.get('/', (req, res) => {
  res.send('Making Sense API version 1.0.0. Status OK.');
});

app.set('port', port);
app.listen(port, () => {
  figlet('Making Sense', (err, data) => {
    if (err) {
      debug('Something went wrong...', err);
      return;
    }
    console.log(data);
    console.log(`Runing on port: ${port}`);
  });
});
