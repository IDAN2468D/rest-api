const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const shopRoute = require("./routes/shop");

const PORT = process.env.PORT || 3000

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/shop", shopRoute);

//routes


//connect to mongodb atlas 
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true }
)
    .then(() => {
        console.log("Connected to mongodb atlas")
    }).catch(error => {
        console.log("Something wirng happened", error)
    })

//Start Server
app.listen(PORT, () => {
    console.log("Server started at PORT ", PORT);
})