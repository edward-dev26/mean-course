const mongoose = require('mongoose');

const username = process.env.DB_USER_NAME;
const password = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.8ewx8.mongodb.net/postsService?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Connected to database successfully!');
  })
  .catch((error) => {
    console.log('Connection to database failed!', error);
  });
