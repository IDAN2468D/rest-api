const mongoose = require("mongoose")

//Author Schema
const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    age: {
        type: String,
        min: 10,
        max: 100
    }
})
module.exports = new mongoose.model("Author", AuthorSchema);