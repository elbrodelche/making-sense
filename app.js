require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});
const debug = require('debug')('makingsense:app');
const figlet = require('figlet');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { PORT } = process.env;
const app = express();
const port = PORT || '3000';

// Routes
const indexRouter = require('./routes/indexRouter')(app);
const authRouter = require('./routes/authRouter')(app);
const authorRouter = require('./routes/authorRouter')(app);
const postRouter = require('./routes/postRouter')(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport middleware
app.use(cookieParser());
app.use(session({
  secret: 'carpediem!',
  resave: false,
  saveUninitialized: true,
}));

require('./config/passport/passport')(app);


app.use(process.env.API_VERSION, authRouter);
app.use(process.env.API_VERSION, authorRouter);
app.use(process.env.API_VERSION, postRouter);
app.use(indexRouter);

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
