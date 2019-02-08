const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const productJson = path.join(rootDir, "data", "products.json");

const getProductsFromFile = cb => {
  fs.readFile(productJson, (err, data) => {
    if (err) return cb(null, []);

    products = JSON.parse(data);
    return cb(null, products);
  });
};

class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((err, done) => {
      this.id = products.length + 1; //bad
      products.push(this);
      fs.writeFile(productJson, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
}
Product.currentId = 1;

module.exports = Product;
