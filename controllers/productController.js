'use strict';

const { INTEGER } = require('sequelize');
const fs = require('fs');
const productData = require('../data/products');
const mail = require('../models/sendmail');
const path = require('path');

const getAllProducts = async (req, res, next) => {
    try {

        const productlist = await productData.getProducts();
        console.log(productlist);
        res.send(productlist);        
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error)
    }
}
const getAllMaleProducts = async (req, res, next) => {
    try {

        const prod = await productData.getAllMaleProducts();
        //console.log(prod);
        //res.send(productlist);        
        res.render('getmaledresses', { prod });
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
        res.redirect('/');
    }
}
const getAllFemaleProducts = async (req, res, next) => {
    try {

        const prod = await productData.getAllFemaleProducts();
        console.log(prod);
        //res.send(prod);   
        res.render('getfemaledresses', { prod });     
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
        res.redirect('/');
    }
}

const getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await productData.getById(productId);
        //console.log("#############getProduct")
        //console.log(productId);
        //console.log(product);
        //console.log("#############-------------------------------------")
        //res.send(product);
        var prod = product[0];
        res.render('productDetails', { prod });
    } catch (error) {
        res.status(400).send(error.message);
        
    }
}

//
const cartProduct = async (req, res, next) => {
    try {
        const cartByUserID = req.params.id;
        const product = await productData.getByUserId(cartByUserID);
        res.send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//
const addToCart = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        const updated = await productData.addToCart(productId,data);
        res.send("Succesfully added to your cart");
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//

const addProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await productData.creatProduct(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatProduct = async (req, res, next) => {
    try {
        const productId =  req.params.id;
        const data = req.body;
        const updated = await productData.updateProduct(productId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//
const bookProduct = async (req, res, next) => {
    try {
        const productId =  req.params.id;
        const data = req.body;
        const updated = await productData.bookProduct(productId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//
const historyProducts = async (req, res, next) => {
    try {
        const productId =  req.params.id;
        const data = req.body;
        const updated = await productData.historyProducts(productId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//

const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productData.deleteProduct(productId);
        res.send(deletedProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const sendmail = async (req,prod) => {
    let to = req.session.username;
    let subject = "Order Placed";
    var data = fs.readFileSync(path.resolve(__dirname, '..') + "\\emails\\sendMail.html");
    let total = parseInt(prod.price) + parseInt(prod.deposite);
    let body = data.toString().replace("{0}", prod.price).replace("{1}", prod.deposite).replace("{2}", total).replace("{3}", req.protocol + "://" + req.get('host') + "/product/" + prod.productId);
    //console.log(body);
    body = body.replace("{4}", prod.bookfrom).replace("{5}", prod.bookto).replace("{6}", prod.productTitle);
    mail.SendMail(to, subject, body);
}

const ordered = async (req, res, next) => {
    try {
         if(req.session.userid == undefined || req.session.userid == 0)
             res.redirect('/users/login');

        const product = await productData.getById(parseInt(req.body.productId));
       
        const data = req.body;
        data.productId = parseInt(req.body.productId);
        data.userID = req.session.userid;
        data.bookfrom = req.body.bookfrom;
        data.bookto = req.body.bookto;
        data.cstatus = "Ordered";
        data.orderdate = new Date();
        data.deposite = 3000;
        const insert = await productData.ordered(data);
        let prod = product[0];
        prod.deposite = data.deposite;
        prod.bookfrom = data.bookfrom;
        prod.bookto = data.bookto;
        console.log("prod::data : ",prod);
        sendmail(req, prod);
        res.redirect('/orders');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const orders = async (req, res, next) => {
    try {
        const userorders = await productData.userorders(req.session.userid);
        console.log("userorders : ", userorders);
        let temp =  userorders;
        res.render('orders/orders',{orders : JSON.stringify(temp)});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    cartProduct,
    addToCart,
    addProduct,
    updatProduct,
    bookProduct,
    historyProducts,
    deleteProduct,
    getAllMaleProducts,
    getAllFemaleProducts,
    ordered,
    orders
}