const express = require("express");
const Shop = require("../models/shop");
const router = express.Router();

//POST CREATE A NEW SHOP
router.post("/", (req, res) => {
    shop = new Shop({
        name: req.body.shopName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge,
        },
        genre: req.body.genre
    });
    shop
        .save()
        .then((shop) => {
            res.send(shop);
        }).catch((error) => {
            res.status(500).send("Shop was not stord in db");
        });
});

module.exports = router;