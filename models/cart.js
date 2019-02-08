const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const cartJson = path.join(rootDir, "data", "cart.json");

class Cart {
  static getCart(cb) {
    fs.readFile(cartJson, (err, file) => {
      if (err) return cb(err);

      return cb(null, JSON.parse(file));
    });
  }

  static addProduct(id, price) {
    // fetch cart
    fs.readFile(cartJson, (err, file) => {
      let cart = {
        products: [],
        totalPrice: 0
      };
      if (!err) {
        cart = JSON.parse(file);
      }

      const existingProduct = cart.products.find(p => p.id === id);
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = {
          ...existingProduct,
          qty: existingProduct.qty + 1
        };
        cart.products = cart.products.filter(p => p !== existingProduct);
      } else {
        updatedProduct = {
          id,
          qty: 1
        };
      }
      cart.products = [...cart.products, updatedProduct];
      cart.totalPrice += Number(price);
      fs.writeFile(cartJson, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(cartJson, (err, file) => {
      if (err) return;

      const updatedCart = { ...JSON.parse(file) };
      const product = updatedCart.products.find(p => p.id === id);
      if (product) {
        updatedCart.totalPrice -= price * product.qty;
        updatedCart.products = updatedCart.products.filter(p => p !== product);
      }
      fs.writeFile(cartJson, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }
}

module.exports = Cart;
