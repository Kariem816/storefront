"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var app = (0, express_1["default"])();
var port = 3000;
var address = "localhost:".concat(port);
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.json({ msg: "Welcome" });
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
