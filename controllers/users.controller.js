const express = require('express');
const router = express.Router();
const Joi = require('joi');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var path = require('path');

const validateRequest = require('../handlelogin/validate-request');
const authorize = require('../handlelogin//authorize')
const userService = require('../data/users/user.service');
const mail = require('../models/sendmail');

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function logout(req, res) {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to log out');
            } else {
                res.redirect('/users/login');
            }
        });
    } else {
        res.end();
    }
}

function authenticate(req, res, next) {
    // let passwordTemp = req.body.password;
    // var hash = bcrypt.hashSync(passwordTemp, 10);
    // console.log(hash);
    // req.body.password = hash;
    userService.authenticate(req.body)
        .then((loginUserData) => {
            if (loginUserData.role == "user") {
                req.session.userid = loginUserData.id;
                req.session.firstname = loginUserData.firstName;
                req.session.username = loginUserData.username;
                res.redirect('/');
            }
            else {
                res.render('login', { err: 'Username or password is incorrect' });
            }
        })
        .catch((error) => {
            console.log(error);
            res.render('login', { err: error });
        });
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        //role: Joi.string().required(),
        mobile: Joi.string().required(),
        gender: Joi.string().required(),
        //dob: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        pincode: Joi.string().required(),
        password: Joi.string().min(6).required()

    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    req.body.role = 'user';
    console.log("req.body : ", req.body);
    userService.create(req.body)
        .then(() => res.redirect("/"))
        .catch((err) => {
            console.log(err);
            res.render('signup', { err: err });
        });
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        // .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}

function profile(req, res) {
    console.log("profile : ", req.session.userid);
    userService.getById(req.session.userid)
        .then((user) => {
            console.log("profile : ", user);
            res.render("account/profile", { user });
        });
}

function terms(req, res) {
    res.render("account/terms", { layout: "" })
}

const sendmail = async (req, userData) => {
    let to = req.body.email;
    let subject = "Reset Password";
    var data = fs.readFileSync(path.resolve(__dirname, '..') + "\\emails\\forgotpassoword.html");
    console.log("forgot password : ", userData);

    let body = data.toString().replace("{0}", req.protocol + "://" + req.get('host') + "/users/verify?id=" + userData.id + "&token=" + userData.hash);
    mail.SendMail(to, subject, body);
}

function forgetpassword(req, res) {
    console.log(req.body);
    userService.getUserByMail(req.body.email)
        .then((userData) => {
            console.log("forgetpassword :: userData", userData);
            if (userData.role == "user") {
                userData.username;
                sendmail(req, userData);
                res.redirect("/users/login");
            }
            else {
                //res.render("/account/forgetpassword", { err: "User not exists" });
                res.render("account/forgotpassword", { err: "User not exists" });
            }
        })
        .catch((error) => {
            //res.render("/users/forgetpassword", { err: "User not exists" });
            //res.redirect("/users/login");
            res.render("account/forgotpassword", { err: "User not exists" });
        });
}

function verify(req, res) {
    //console.log(req.query.id);
    //console.log(req.query.token);
    let token = req.query.token;
    userService.getUserByID(parseInt(req.query.id))
        .then((userData) => {
            //console.log("verify :: userData", userData);
            if (userData.role == "user") {
                if (userData.hash == token) {
                    req.tempData.set('userId', req.query.id);
                    res.render("account/verify");
                }
            }
            else {
                res.redirect("/users/login");
            }
        })
        .catch((error) => {
            res.redirect("/users/login");
        });
}

function changePassword(req, res) {
    var userId = req.tempData.get('userId');
    console.log("changePassword::userId : " + userId);
    console.log("changePassword::req.body : ", req.body);
        userService.updatePassowrd(userId, req.body.confirmpassword)
        .then((userData) => {
            console.log("changePassword:: changed : ");
            res.redirect("/users/login");
        })
        .catch((error) => {
           // res.render("account/verify", {err:"Passowrd not Changed"});
            res.redirect("/users/verify?id=11&token=$2a$10$bWDfRpZH2M55wfbb2clV3OYEuobx2eccqZUZLaNm1iSPFBFdKkXq6");
        });
}

module.exports = {
    authenticateSchema,
    authenticate,
    registerSchema,
    register,
    getAll,
    getCurrent,
    getById,
    updateSchema,
    update,
    _delete,
    profile,
    logout,
    terms,
    forgetpassword,
    verify,
    changePassword
}