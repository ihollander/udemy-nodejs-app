const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");
const Cart = require("./cart");

const productJson = path.join(rootDir, "data", "products.json");

const getProductsFromFile = cb => {
  fs.readFile(productJson, (err, data) => {
    if (err) return cb(null, []);

    products = JSON.parse(data);
    return cb(null, products);
  });
};

class Product {
  constructor({ id, title, imageUrl, description, price }) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((err, products) => {
      let updatedProducts = [...products];
      if (this.id) {
        const existingProduct = updatedProducts.find(p => p.id === this.id);
        updatedProducts = updatedProducts.filter(p => p !== existingProduct);
      } else {
        this.id = Math.random().toString();
      }
      updatedProducts.push(this);
      fs.writeFile(productJson, JSON.stringify(updatedProducts), err => {
        console.log(err);
      });
    });
  }

  static delete(id) {
    getProductsFromFile((err, products) => {
      const product = products.find(p => p.id === id);
      const updatedProducts = products.filter(p => p.id !== id);
      fs.writeFile(productJson, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetch(id, cb) {
    getProductsFromFile((err, products) => {
      const product = products.find(p => p.id === id);
      cb(null, product);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
}

module.exports = Product;
