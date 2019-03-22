const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const dateHelper = require('../helpers/dateHelper');

// Register
router.post('/register', (req, res, next) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    createdDate: dateHelper.createDateAsUTC(new Date()),
    // createdDate: new Date(),
  });

  User.getUserByEmail(newUser.email, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.json({success: false, msg: 'El correo electrónico ya ha sido registrado.'});
    }

    User.addUser(newUser, (err, user) => {
      if (err) {
        res.json({success: false, msg: 'Falló la registración del usuario'});
      } else {
        res.json({success: true, msg: 'Ahora estás registrado y puedes iniciar sesión'});
      }
    });
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({success: false, msg: 'Usuario no encontrado'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800, // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
          },
        });
      } else {
        return res.json({success: false, msg: 'Contraseña incorrecta'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
