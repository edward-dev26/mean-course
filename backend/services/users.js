const bcrypt = require('bcryptjs');

const User = require('../models/user');

class UsersService {
  async createUser(userData) {
    const user = new User(userData);
    const jwtToken = await user.generateToken();

    return {
      jwtToken,
      user,
    };
  }

  async loginUser({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid login or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error('Invalid login or password');
    }

    const jwtToken = await user.generateToken();

    return {
      user,
      jwtToken,
    };
  }

  async clearToken(user, token) {
    user.tokens = user.tokens.filter((t) => t.token !== token);
    await user.save();
  }

  async getUserByIdAndToken(id, token) {
    if (!id || !token) {
      throw new Error("id or token weren't provided!");
    }

    return await User.findOne({ _id: id, 'tokens.token': token });
  }
}

module.exports = new UsersService();
