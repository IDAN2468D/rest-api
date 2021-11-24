const express = require("express");
const router = express.Router();
const { Shop, validateShop } = require("../models/shop");

//POST CREATE A NEW SHOP
router.post("/", async (req, res) => {
    const error = await validateShop(req.body);
    if (error.message) res.status(400).send(error.message);

    shop = new Shop({
        name: req.body.shopName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge,
        },
        genre: req.body.genre
    });
    shop.save()
        .then((shop) => {
            res.send(shop);
        }).catch((error) => {
            res.status(500).send("Shop was not stored in db");
        });
});

module.exports = router;