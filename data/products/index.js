'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getProducts = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const productsList = await pool.request().query(sqlQueries.productslist);
        return productsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}
const getAllMaleProducts = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const productsList = await pool.request().query(sqlQueries.maleproductslist);
        return productsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}
const getAllFemaleProducts = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const productsList = await pool.request().query(sqlQueries.femaleproductslist);
        return productsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(productId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const product = await pool.request()
                            .input('productId', sql.Int, productId)
                            .query(sqlQueries.productbyId);
        return product.recordset;
    } catch (error) {
        return error.message;
    }
}

//
const getByUserId = async([cartByUserID]) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const product = await pool.request()
                            .input('cartByUserID', sql.Int, cartByUserID)
                            .query(sqlQueries.cartProduct);
        return product.recordset;
    } catch (error) {
        return error.message;
    }
}
//

const creatProduct = async (productdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const insertProduct = await pool.request()
                            .input('productTitle', sql.NVarChar(100), productdata.productTitle)
                            .input('productDescription', sql.NVarChar(100), productdata.productDescription)
                            .input('imagepath', sql.NVarChar(500), productdata.imagepath)
                            .input('category', sql.NVarChar(100), productdata.category)
                            .input('size', sql.NVarChar(100), productdata.size)
                            .input('price', sql.NVarChar(100), productdata.price)
                            .input('uploadedBy', sql.NVarChar(100), productdata.uploadedBy)
                            .input('gender', sql.NVarChar(100), productdata.gender)
                            // .input('availability', sql.NVarChar(100), productdata.availability)
                            // .input('bookingStatus', sql.NVarChar(100), productdata.bookingStatus)
                            // .input('bookedByUserID', sql.Int, productdata.bookedByUserID)
                            // .input('bookedOn', sql.Date, productdata.bookedOn)
                            .query(sqlQueries.createProduct);                            
        return insertProduct.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateProduct = async (productId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const update = await pool.request()
                        .input('productId', sql.Int, productId)
                        .input('productTitle', sql.NVarChar(100), data.productTitle)
                        .input('productDescription', sql.NVarChar(1500), data.productDescription)
                        .input('imagepath', sql.NVarChar(100), data.imagepath)
                        .input('category', sql.NVarChar(100), data.category)
                        .input('size', sql.NVarChar(200), data.size)
                        .input('price', sql.NVarChar(100), data.price)
                        .input('uploadedBy', sql.NVarChar(100), data.uploadedBy)
                        .input('gender', sql.NVarChar(1500), data.gender)
                        .input('availability', sql.NVarChar(100), data.availability)
                        .input('bookingStatus', sql.NVarChar(100), data.bookingStatus)
                        .input('bookedByUserID', sql.Int, data.bookedByUserID)
                        .input('bookedOn', sql.Date, data.bookedOn)
                        .query(sqlQueries.updateProduct);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}
//
const bookProduct = async (productId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const update = await pool.request()
                        .input('productId', sql.Int, productId)
                        .input('availability', sql.NVarChar(100), data.availability)
                        .input('bookingStatus', sql.NVarChar(100), data.bookingStatus)
                        .input('bookedByUserID', sql.Int, data.bookedByUserID)
                        .input('bookedOn', sql.Date, data.bookedOn)
                        .input('bookedto', sql.Date, data.bookedto)
                        .query(sqlQueries.bookProduct);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}
//
const historyProducts = async (productId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const update = await pool.request()
                        // .input('productId', sql.Int, productId)
                        // .input('productTitle', sql.NVarChar(100), data.productTitle)
                        // .input('bookfrom', sql.Date, data.bookfrom)
                        // .input('bookto', sql.Date, data.bookto)
                        // .input('cstatus', sql.NVarChar(100), data.cstatus)
                        .input('userID', sql.Int, data.userID)
                        .query(sqlQueries.historyProducts);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}
//
// const addToCart = async (productId, data) => {
//     try {
//         let pool = await sql.connect(config.sql);
//         const sqlQueries = await utils.loadSqlQueries('products');
//         const update = await pool.request()
//                         .input('productId', sql.Int, productId)
//                         .input('cartByUserID', sql.Int, data.cartByUserID)
//                         .query(sqlQueries.addToCart);
//         return update.recordset;
//     } catch (error) {
//         return error.message;
//     }
// }
//

const deleteProduct = async (productId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const deleteProduct = await pool.request()
                            .input('productId', sql.Int, productId)
                            .query(sqlQueries.deleteProduct);
        return deleteProduct.recordset;
    } catch (error) {
        return error.message;
    }
}

const ordered = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const insertOrder = await pool.request()
                        .input('productId', sql.Int, data.productId)
                        .input('userID', sql.Int, data.userID)
                        .input('bookfrom', sql.Date, data.bookfrom)
                        .input('bookto', sql.Date, data.bookto)
                        .input('orderdate', sql.DateTime, data.orderdate)
                        .input('cstatus', sql.NVarChar(100), data.cstatus)
                        .input('deposite', sql.Float, data.deposite)
                        .query(sqlQueries.ordered);
        return insertOrder.recordset;
    } catch (error) {
        return error.message;
    }
}

const userorders = async (userID) => {   
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const userorderList = await pool.request()
                                  .input('userID', sql.Int, userID)
                                  .query(sqlQueries.userorders);
        return userorderList.recordset;
    } catch (error) {
        return error.message;
    }
}

const allorders = async (userID) => {   
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const userorderList = await pool.request().query(sqlQueries.allorders);
        return userorderList.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateOrderStatus = async (data) => {
    try {
        console.log("updateOrderStatus :: data - ",data);
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const update = await pool.request()
                        .input('cstatus', sql.NVarChar(100), data.cstatus)
                        .input('orderid', sql.Int, data.orderid)
                        .query(sqlQueries.updateOrderStatus);
        return update.recordset;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

module.exports = {
    getProducts,
    getById,
    getByUserId,
    creatProduct,
    updateProduct,
    bookProduct,
    historyProducts,
    //addToCart,
    deleteProduct,
    getAllMaleProducts,
    getAllFemaleProducts,
    ordered,
    userorders,
    allorders,
    updateOrderStatus
}