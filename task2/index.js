const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const filterShops = require("./routes/filter");
const favourite = require("./routes/favourite");
const shop = require("./routes/shop");
const poi = require("./routes/poi");
const viewRouter = require("./routes/viewRoutes");
const register = require("./routes/register");
const login = require("./routes/login");
const verify = require("./routes/register-verify");
const resetPassword = require("./routes/reset-password");
const cookieParser = require("cookie-parser");

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cookieParser());

const db_name = "guide_to_graz";
let MongoClient = require("mongodb").MongoClient;
let db;

//Server

MongoClient.connect(
  "mongodb://localhost:27017",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    exports.db = client.db(db_name);
    app.listen(3010, () => {
      console.log("listening on 3010");
    });
  }
);

// Mounting Multiple Routes
app.use("/", viewRouter);
app.use("/filter", filterShops);
app.use("/favourite", favourite);
app.use("/shop", shop);
app.use("/poi", poi);
app.use("/register", register);
app.use("/login", login);
app.use("/verify", verify);
app.use("/reset-password", resetPassword);
