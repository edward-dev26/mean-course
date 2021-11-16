const usersService = require('../services/users');

class UsersController {
  async createUser(req, res) {
    try {
      const { fullName, email, password } = req.body;

      const result = await usersService.createUser({
        fullName,
        email,
        password,
      });

      res.status(201).send(result);
    } catch (error) {
      res.status(400).send({
        message: error.message,
        fields: error.keyValue,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await usersService.loginUser({ email, password });

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      await usersService.clearToken(req.user);

      res.status(200).send({
        message: 'Logout successfully',
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  getMe(req, res) {
    res.status(200).send(req.user);
  }
}

module.exports = new UsersController();
