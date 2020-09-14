const express = require('express');

const routers = express.Router();
const authService = require('../services/auth');
const userServices = require('../services/user');
const authMiddleware = require('../middlewares/auth');

routers.post('/', (req, res) => {
  res.json('Application running');
});
routers.post('/signin', (req, res) => {
  authService.login(req, res);
});
routers.post('/signup', (req, res) => {
  userServices.create(req, res);
});
routers.get('/findUser/:user_id', authMiddleware, (req, res) => {
  userServices.findUser(req, res);
});

module.exports = routers;
