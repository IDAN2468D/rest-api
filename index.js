const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const shopRoute = require("./routes/shop");
const winston = require("winston");

const PORT = process.env.PORT || 3000

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//create a logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true })
            )
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
    ]
});

//routes
app.use("/api/shop", shopRoute);


//connect to mongodb atlas 
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true }
)
    .then(() => {
        logger.info("connected to mongoDb atlas");
    }).catch(error => {
        logger.error(error.mongoose);
    })

//Start Server
app.listen(PORT, () => {
    logger.info(`Server started at PORT${PORT}`);
})