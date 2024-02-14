'use strict';

const express = require('express');
const productControll = require('../controllers/productController');
const router = express.Router();

router.post('/ordered', productControll.ordered); 
router.get('/orders', productControll.orders); //To get all User orders
router.get('/products', productControll.getAllProducts); //To get all products
router.get('/getAllMaleProducts', productControll.getAllMaleProducts); //To get all male products
router.get('/getAllFemaleProducts', productControll.getAllFemaleProducts); //To get all female products
router.get('/product/:id', productControll.getProduct);  //To get ine product
router.get('/cartproduct/:id', productControll.cartProduct); //To get cart product by user id
router.post('/product', productControll.addProduct); // To add new product
router.put('/product/:id', productControll.updatProduct); // To update product
router.put('/bookproduct/:id', productControll.bookProduct); // To book product by user id
router.put('/addtocart/:id', productControll.addToCart);   //To cart product by user id
router.delete('/product/:id', productControll.deleteProduct); // To delete product
router.get('/historyproducts', productControll.historyProducts);

module.exports = {
    routes: router
}