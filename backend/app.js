const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

require('./db');
const access = require('./middlewares/access');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(access);
app.use('/images', express.static(path.join('images')));
app.use('/api/posts/', postsRouter);
app.use('/api/users/', usersRouter);

module.exports = app;
