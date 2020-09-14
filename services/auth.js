/* eslint-disable no-throw-literal */
const bcrypt = require('bcrypt');
const moment = require('moment');
const users = require('../models/user');

const userService = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await users.findOne({ email }).select('+password');

      if (!user) throw { data: { mensagem: 'Usuário e/ou senha inválidos' }, status: 400 };
      if (!bcrypt.compareSync(password, user.password)) throw { data: { mensagem: 'Usuário e/ou senha inválidos' }, status: 400 };

      user.lastLogin = new Date();

      await users.updateOne({ _id: user._id }, user, { multi: false });

      user.password = undefined;

      res.status(200).json({
        id: user._id,
        data_criacao: moment(user.createdAt).format('DD/MM/YYYY hh:mm:ss'),
        data_atualizacao: moment(user.updatedAt).format('DD/MM/YYYY hh:mm:ss'),
        ultimo_login: moment(user.lastLogin).format('DD/MM/YYYY hh:mm:ss'),
        token: user.token,
      });
    } catch (error) {
      if (error.status) res.status(error.status).json(error.data);
      else res.status(500).json(error);
    }
  },
};

module.exports = userService;
