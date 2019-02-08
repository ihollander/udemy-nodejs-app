const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
        path: "/products"
      });
    })
    .catch(console.error);
};

exports.getProduct = (req, res, next) => {
  const { id } = req.params;
  Product.fetch(id)
    .then(([products]) => {
      res.render("shop/product-detail", {
        product: products[0],
        pageTitle: products[0].title,
        path: "/products"
      });
    })
    .catch(console.error);
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(console.error);
};

exports.getCart = (req, res, next) => {
  Cart.getCart((err, cart) => {
    Product.fetchAll((err, products) => {
      const cartProducts = [];
      if (cart && cart.products.length) {
        for (product of products) {
          const cartProduct = cart.products.find(p => p.id === product.id);
          if (cartProduct) {
            cartProducts.push({ productData: product, qty: cartProduct.qty });
          }
        }
      }

      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const { id } = req.body;
  Product.fetch(id, (err, product) => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { id } = req.body;
  Product.fetch(id, (err, product) => {
    Cart.deleteProduct(id, product.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders"
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    prods: products,
    pageTitle: "Checkout",
    path: "/checkout"
  });
};
