const jwt = require('jsonwebtoken');
const usersService = require('../services/users');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usersService.getUserByIdAndToken(data._id, token);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: 'Authorization failed',
    });
  }
};

module.exports = auth;
