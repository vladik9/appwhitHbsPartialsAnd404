const express = require("express");
const app = express();
//for path join, get the local path
const path = require("path");
//get the public path to the file
const publicFolder = path.join(__dirname, "./public");
// set the public folder path, from this point our file are placed,
// is helping to incorporate the style withouth the necessity of using express static
app.use(express.static("public"));
// do not forget to insert css link in index file whtiout relative path
// just inser style file

app.use(express.static(publicFolder));
// for view engine using handlebar like ejs templates
//need to have a views folder whit currettly files ended in hbs extension
app.set("view engine", "hbs");

//#################for case when we want to change the name of the views folder#############################
// we need to change the name path for the current folder using
const newVewsPath = path.join(__dirname, "./appViewsPages");
// a this time is necesary to have set a view engine for hbs
app.set("views", newVewsPath);

//for partials used for footers and headers to create once
// and use multiple times
//########################## partials
// require hbs module for partials
const hbs = require("hbs");
// get the file location for our partials files
const partialHbsPath = path.join(__dirname, "./appViewsPages");
//configure the hbs for location of the partials files
hbs.registerPartials(partialHbsPath);
//inside the index hbs file we need to incorporeate the partials files
//{{>partialFileName}}
//################################################################
// for correct working via hbs and ejs is requred a get method
app.get("/", (req, res) => {
  res.render("index", { userValue: "Some value" }); // just index without the extension
  //and for dinamic template we seend an value of string to the hbs file
});

// in case we want to use fetch function for client side api requests
// we need to include the get method for the browser in main js file like
//api.js
app.get("/fetch.js", (req, res) => {
  res.sendFile(__dirname + "/fetch.js"); // a second js file
}); // do not forget to include the script src in html file
// to for creating a get request to server

//for  404 webpage
app.get("*", (req, res) => {
  res.send("404 web page");
});

//open the port for our server
app.listen(8080, function () {
  console.log("port opened  on  8080 ");
});
