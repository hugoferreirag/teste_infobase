/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ mensagem: 'Não autorizado' });
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).json({ mensagem: 'Não autorizado' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ mensagem: 'Não autorizado' });

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error) return res.status(401).json({ mensagem: 'Não autorizado' });
    req.token = token;
    req.email = decoded.email;
    return next();
  });
};
