const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// GET /admin/add-product
router.get("/add-product", adminController.getAddProduct);

// GET /admin/edit-product/:id
router.get("/edit-product/:id", adminController.getEditProduct);

// POST /admin/add-product
router.post("/add-product", adminController.postAddProduct);

// POST /admin/add-product
router.post("/edit-product", adminController.postEditProduct);

// POST /admin/add-product
router.post("/delete-product", adminController.postDeleteProduct);

// GET /admin/products
router.get("/products", adminController.getProducts);

module.exports = router;
