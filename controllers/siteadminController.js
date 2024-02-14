'use strict';

const { INTEGER } = require('sequelize');
const productData = require('../data/products');
const userService = require('../data/users/user.service');
const fs = require('fs');
const formidable = require('formidable');

const login = async (req, res) => {
  res.render('siteadmin/siteadminlogin', { layout: "" });
}

const authenticate = async (req, res) => {
  console.log(req.body);
  userService.authenticate(req.body)
    .then((loginUserData) => {
      console.log("siteadmin authenticate :- ", loginUserData);
      if (loginUserData.role == "provider") {
        req.session.sid = loginUserData.id;
        req.session.sfullname = loginUserData.firstName + " " + loginUserData.lastName;
        req.session.susername = loginUserData.username;
        res.redirect('/siteadmin/allproducts');
      }
      else {
        res.redirect('/siteadmin/login');
      }
    })
    .catch((error) => {
      console.log(error);
      //res.redirect('/siteadmin/login',{err});
      //res.render('siteadmin/login', {layout:"", err:err});
      res.render('siteadmin/siteadminlogin', { layout: "", err: error });
    });
}

const logout = async (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out');
      } else {
        res.redirect('/siteadmin/login');
      }
    });
  } else {
    res.end();
  }
}

const allorders = async (req, res) => {
  try {
    const orderList = await productData.allorders();
    //console.log(orderList);
    res.render('siteadmin/orders', { layout: "layouts/layout2", orders: JSON.stringify(orderList) });
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error)
  }
}
const allproducts = async (req, res) => {
  try {
    const productList = await productData.getProducts();
    //console.log(productList);
    res.render('siteadmin/products', { layout: "layouts/layout2", products: JSON.stringify(productList) });
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error)
  }
}

const addproduct = async (req, res) => {
  try {
    res.render('siteadmin/addproduct.hbs', { layout: "layouts/layout2" });
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error)
  }
}
const saveProduct = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      console.log("fields :=> ", fields);
      let uploadedBy = req.session.susername;
      console.log("saveProduct : req.session.susername : - ", uploadedBy);
      let data = {};
      data.productTitle = fields.productTitle;
      data.productDescription = fields.productDescription;
      data.category = fields.category;
      data.size = fields.size;
      data.price = fields.price;
      data.uploadedBy;
      data.gender = fields.gender;
      data.imagepath = files.prodimg.originalFilename;

      const insert = await productData.creatProduct(data);
      console.log(insert[0].productId);
      let prodID = insert[0].productId;
      let tmpUploadsPath = `./public/images/${prodID}`;
      console.log("tmpUploadsPath : ", tmpUploadsPath);
      if (!fs.existsSync(tmpUploadsPath)) {
        fs.mkdir(tmpUploadsPath, { recursive: true }, (err) => { });
      };
      var oldPath = files.prodimg.filepath;
      var newPath = tmpUploadsPath + '/' + files.prodimg.originalFilename;
      console.log("newPath :=> " + newPath);
      console.log("oldPath :=> " + oldPath);
      fs.readFile(oldPath, function (err, data) {
        if (!err)
          fs.writeFile(newPath, data, (err) => {
            if (err) {
              console.log(err);
            }
          });
        else
          console.log(err);
      });
    });
    res.redirect("/siteadmin/allproducts");
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error)
  }
}

const deleteprod = async (req, res) => {
  try {
    console.log('Request Id:', req.params.id);
    const deletedProd = await productData.deleteProduct(req.params.id);
    console.log(deletedProd);
    res.status(200).send(true);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error)
  }
}

const updateorderStatus = async (req, res) => {
  try {
    console.log('Request Id:', req.params.id);
    console.log('req body:', req.body);
    let data = {};
    data.cstatus = req.body.orderstatus;
    data.orderid = parseInt(req.params.id);
    console.log(data);
    const update = await productData.updateOrderStatus(data);
    res.status(200).send(true);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error)
  }
}


module.exports = {
  login,
  authenticate,
  logout,
  allorders,
  allproducts,
  addproduct,
  saveProduct,
  deleteprod,
  updateorderStatus
}