require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const postRouter = express.Router();

postRouter.route('/posts').get((req, res) => {
  const response = { hello: 'Im a post' };
  res.json(response);
});

app.use(process.env.API_VERSION, postRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
