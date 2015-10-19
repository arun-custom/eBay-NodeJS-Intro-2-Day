var express = require("express");
var exphbs = require("express-handlebars");
var request = require("request");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static("public"));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
	request({
		method: "GET",
		uri: "https://daretodiscover.herokuapp.com/wines"
	}, function(error, response, body) {
		res.render("index", {
			wines: JSON.parse(body)
		});
	});
});

app.post("/new", function(req, res) {
	request({
		method: "POST",
		uri: "https://daretodiscover.herokuapp.com/wines",
		formData: req.body.wine
	}, function(error, response, body) {
		res.redirect("/");
	});
});

app.get("/edit/:id", function(req, res) {
	request({
		method: "GET",
		uri: "http://daretodiscover.herokuapp.com/wines/" + req.params.id
	}, function(error, response, body) {
		res.render("edit", {
			wine: JSON.parse(body)
		});
	});
});

app.put("/edit/:id", function(req, res) {
	request({
		method: "PUT",
		uri: "https://daretodiscover.herokuapp.com/wines/" + req.params.id,
		formData: req.body.wine
	}, function(error, response, body) {
		res.redirect("/");
	});
});

app.delete("/delete/:id", function(req, res) {
	request({
		method: "DELETE",
		uri: "https://daretodiscover.herokuapp.com/wines/" + req.params.id
	}, function(error, response, body) {
		res.redirect("/");
	});
});

app.listen(3000);