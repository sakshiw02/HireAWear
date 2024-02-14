'use strict';

const express = require('express');
const siteadminController = require('../controllers/siteadminController');
const router = express.Router();

router.get('/login', siteadminController.login);
router.post('/login', siteadminController.authenticate);
router.get('/logout', siteadminController.logout);
router.get('/allorders', siteadminController.allorders);
router.get('/allproducts', siteadminController.allproducts);
router.get('/addproduct', siteadminController.addproduct);
router.post('/addproduct', siteadminController.saveProduct);
router.delete('/deleteprod/:id', siteadminController.deleteprod);
router.put('/updateorderStatus/:id', siteadminController.updateorderStatus);


module.exports = {
    routes: router
}