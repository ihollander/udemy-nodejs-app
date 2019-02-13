// Node core modules
const path = require("path");

// Third-party modules
const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

// Local modules
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");

// ORM setup
const sequelize = require("./util/db");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Product.belongsToMany(Cart, { through: CartItem });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// Create Express app instance
// and configure middleware
const app = express();
// app.engine(
//   "handlebars",
//   expressHbs({ defaultLayout: "main-layout", layoutsDir: "views/layouts" })
// );
app.set("view engine", "ejs");
app.set("views", "views"); // this is the default, doesn't need to be set explicitly

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// adding access to current user via middleware
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.error("no user available");
      next();
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 if none of the routes are hit
app.use(errorsController.notFound);

sequelize
  .sync()
  // .sync({ force: true }) // will drop and re-create tables each time app loads
  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Ian", email: "hi@hi.com" });
    } else {
      return user;
    }
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => {
    console.log("Starting server");
    app.listen(3000);
  })
  .catch(console.error);
