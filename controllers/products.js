const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    activeProduct: true,
    productCSS: true,
    formsCSS: true,
    path: "/admin/add-product"
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((err, products) => {
    res.render("shop", {
      prods: products,
      hasProducts: !!products.length,
      activeShop: true,
      productCSS: true,
      pageTitle: "Shop",
      path: "/"
    });
  });
};
