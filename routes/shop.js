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


//GET ALL SHOP
router.get("/", (req, res) => {
    Shop.find()
        .then((shops) => res.send(shops))
        .catch((error) => {
            res.status(500).send("Something went wrong")
        });
});


//GET THE SHOP BY ID 
router.get("/:bookId", async (req, res) => {
    const book = await Shop.findById(req.params.bookId)
    if (!book) res.status(404).send("Book not work");
    res.send(book);
});

// Update Shop Base ON ID
router.put("/:shopId", async (req, res) => {
    const updateShop = await Shop.findByIdAndUpdate(
        req.params.shopId, {
        name: req.body.shopName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge
        },
        genre: req.body.genre
    }, { new: true })
    if (!updateShop) res.status(404).send("shop nont found");
    res.send(updateShop)
});


//DELETE SHOP Base ON ID
router.delete("/:shopId", async (req, res) => {
    const shop = await Shop.findByIdAndRemove(req.params.shopId);
    if (!shop) res.status(404).send("shop with id not found");
    res.send(shop);
});

module.exports = router;