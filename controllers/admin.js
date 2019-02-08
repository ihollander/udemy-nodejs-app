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
  Product.fetch(id, (err, product) => {
    if (!product) return redirect("/");

    res.render("admin/edit-product", {
      product: product,
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: !!edit
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, description, imageUrl, price } = req.body;
  const product = new Product({
    id: null,
    title,
    description,
    imageUrl,
    price
  });
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch(console.error);
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, description, imageUrl, price } = req.body;
  const product = new Product({ id, title, description, imageUrl, price });
  product.save();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const { id } = req.body;
  Product.delete(id);
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((err, products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  });
};
