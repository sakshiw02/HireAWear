'use strict';

const express = require('express');
const userControll = require('../controllers/users.controller');
const router = express.Router();
const authorize = require('../handlelogin/authorize')

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.get('/forgetpassword', function(req, res) {
    res.render("account/forgotpassword");
});
router.get('/verify', userControll.verify);
router.post('/verify', userControll.changePassword);
router.post('/forgetpassword', userControll.forgetpassword);

router.get('/terms', userControll.terms);
router.get('/logout', userControll.logout);
router.get('/profile', userControll.profile);
router.post('/authenticate', userControll.authenticateSchema, userControll.authenticate);
router.post('/register', userControll.registerSchema, userControll.register);
router.get('/', authorize(), userControll.getAll);
router.get('/current', authorize(), userControll.getCurrent);
router.get('/:id', authorize(), userControll.getById);
router.put('/:id', authorize(), userControll.updateSchema, userControll.update);
router.delete('/:id', authorize(), userControll._delete);
//router.get('/profile',authorize(), userControll.profile);


module.exports = {
    routes: router
}