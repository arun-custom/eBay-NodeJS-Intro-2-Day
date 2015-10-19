var express = require("express");
var exphbs = require("express-handlebars");
var request = require("request");

var app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/escaped", function(req, res) {
	request({
		method: "GET",
		uri: "https://facebook.com"
	}, function(error, response, body) {
		res.render("with-escape", {
			body: body,
			layout: false
		})
	});
});

app.get("/without-escape", function(req, res) {
	request({
		method: "GET",
		uri: "https://facebook.com"
	}, function(error, response, body) {
		res.render("without-escape", {
			body: body,
			layout: false
		})
	});
});

app.listen(3000);