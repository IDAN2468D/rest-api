const mongoose = require("mongoose");
const Author = require("./author");
const yup = require("yup");


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


const validateShop = (shop) => {
    const schema = yup.object().shape({
        shopName: yup.string().required().min(3).max(50),
        authorName: yup.string().required().min(3).max(40),
        authorAge: yup
            .number()
            .required()
            .min(10, "Age must be greater than 10")
            .max(100, "Age must be less than 100"),
        genre: yup.string().required().min(3).max(20),
    });

    return schema
        .validate(shop)
        .then((shop) => shop)
        .catch((error) => {
            return {
                message: error.message
            }
        });
}




exports.Shop = new mongoose.model("Shop", ShopSchema);
exports.validateShop = validateShop;