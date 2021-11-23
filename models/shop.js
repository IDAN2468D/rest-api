const mongoose = require("mongoose");
const Author = require("./author");

//BOOK SCHEMA
const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    author: Author.schema,
    genre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    }
});

module.exports = new mongoose.model("Shop", ShopSchema);