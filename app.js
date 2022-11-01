var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("express-handlebars");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var fileUpload = require("express-fileupload");
var db = require("./config/connection");
var session = require("express-session");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/header-partials/",
    helpers: {
      incremented: function (index) {
        index++;
        return index;
      },
    },
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(session({ secret: "Key", cookie: { maxAge: 600000 } }));
db.connect((err) => {
  if (err) console.log("Error" + err);
  else console.log("Database Connected Successfully");
});
app.use("/", usersRouter);
app.use("/admin", adminRouter);

module.exports = app;
