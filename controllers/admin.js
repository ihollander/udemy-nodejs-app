const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    product: {},
    editing: false
  });
};

exports.getEditProduct = (req, res, next) => {
  const { edit } = req.query;
  if (!edit) return res.redirect("/");

  const { id } = req.params;
  req.user
    .getProducts({ where: { id } })
    .then(([product]) => {
      res.render("admin/edit-product", {
        product: product,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: !!edit
      });
    })
    .catch(console.error);
};

exports.postAddProduct = (req, res, next) => {
  const { title, description, imageUrl, price } = req.body;

  req.user
    .createProduct({ title, description, imageUrl, price })
    .then(product => {
      console.log("Product created");
      res.redirect("/admin/products");
    })
    .catch(console.error);
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, description, imageUrl, price } = req.body;

  Product.findByPk(id)
    .then(product => {
      product.title = title;
      product.description = description;
      product.imageUrl = imageUrl;
      product.price = price;

      return product.save();
    })
    .then(product => {
      console.log("Product updated");
      res.redirect("/admin/products");
    })
    .catch(console.error);
};

exports.postDeleteProduct = (req, res, next) => {
  const { id } = req.body;
  Product.findByPk(id)
    .then(product => {
      return product.destroy();
    })
    .then(() => {
      console.log("Product deleted");
      res.redirect("/admin/products");
    })
    .catch(console.error);
};

exports.getProducts = (req, res, next) => {
  const { id } = req.user;
  req.user
    .getProducts({ where: { userId: id } })
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(console.error);
};
