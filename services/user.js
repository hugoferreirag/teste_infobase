const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const user = require('../models/user');
const authConfig = require('../config/auth');

const encryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
const generateToken = (params = {}) => jwt.sign(params, authConfig.secret);

const userService = {
  create: async (req, res) => {
    const payload = req.body;
    try {
      if (!payload.name && !payload.name.length > 4) throw new Error({ msg: 'Informe um nome válido, nome deve conter pelo menos 4 caracteres', status: 400 });
      if (!payload.password && !payload.password.length > 4) throw new Error({ msg: 'Informe uma senha válida, senha deve conter pelo menos 4 caracteres', status: 400 });
      if (!payload.email) throw new Error({ msg: 'Informe um email válida', status: 400 });

      const token = generateToken({ email: payload.email });

      const newUser = {
        name: payload.name,
        email: payload.email,
        password: await encryptPassword(payload.password),
        createdAt: new Date(),
        phones: payload.phones,
        token,
        lastLogin: new Date(),
      };

      const existsUser = await user.findOne({ email: newUser.email });
      if (existsUser) throw new Error({ mensagem: 'Email já existente', status: 400 });
      const data = await user.create(newUser);
      res.status(201).json({
        id: data._id,
        data_criacao: moment(existsUser.createdAt).format('DD/MM/YYYY hh:mm:ss'),
        data_atualizacao: moment(existsUser.updatedAt).format('DD/MM/YYYY hh:mm:ss'),
        ultimo_login: moment(existsUser.lastLogin).format('DD/MM/YYYY hh:mm:ss'),
        token: data.token,
      });
    } catch (error) {
      if (error.status) res.status(error.status).json(error);
      else res.status(500).json(error);
    }
  },
  findUser: async (req, res) => {
    const { user_id } = req.params;
    try {
      if (!user_id) throw new Error({ mensagem: 'user_id não informado', status: 401 });

      const existsUser = await user.findOne({ _id: user_id });

      if (!existsUser) throw new Error({ mensagem: 'user_id não existe', status: 401 });
      if (existsUser.token !== req.token) throw new Error({ mensagem: 'Não Autorizado', status: 403 });
      const dateNow = new Date();
      const compareDates = moment(dateNow).diff(existsUser.lastLogin, 'minutes') < 30;
      if (!compareDates) throw new Error({ mensagem: 'Sessão inválida', status: 403 });
      existsUser.token = undefined;
      res.status(200).json({
        user_id: existsUser._id,
        nome: existsUser.name,
        email: existsUser.email,
        telefones: existsUser.phones,
        data_criacao: moment(existsUser.createdAt).format('DD/MM/YYYY hh:mm:ss'),
        data_atualizacao: moment(existsUser.updatedAt).format('DD/MM/YYYY hh:mm:ss'),
        ultimo_login: moment(existsUser.lastLogin).format('DD/MM/YYYY hh:mm:ss'),
      });
    } catch (error) {
      if (error.status) res.status(error.status).json(error);
      else res.status(500).json(error);
    }
  },
};

module.exports = userService;
