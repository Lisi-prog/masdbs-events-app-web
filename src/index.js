const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
// const mysql = require("mysql");
// const myConnection = require("express-myconnection");
// const {database} = require("./keys");

//Connect to server


//Initialization
//require("./passport/local-auth");

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(expressLayouts);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
// app.use(myConnection(mysql, database, "single"));

//Routes
app.use(require("./routes/index"));

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Listening to server
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});