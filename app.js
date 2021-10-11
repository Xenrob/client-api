require("dotenv").config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 3001;


//API security
//app.use(helmet());

//handle CORS error
app.use(cors());

//MongoDB Connection Setup
const mongoose = require('mongoose');

//created connection to the database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
        //useFindAndModify: false,
        //useCreateIndex: true
});

//When not in production, check if connection is connected to mongoose
//and give error message if not connected
if (process.env.NODE_ENV !== "production") {

    const mDb = mongoose.connection;

    mDb.on("open", () => {
        console.log("MongoDB is connected");
    });

    mDb.on("error", (error) => {
        console.log(error);
    });

    //Logger
    app.use(morgan("tiny"));
}


//Set body bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Load routers
const useRouter = require("./src/routers/user.router");
const ticketRouter = require("./src/routers/ticket.router");

//UseRouters
app.use("/v1/user", useRouter);
app.use("/v1/ticket", ticketRouter);

//Error handler
const handleError = require("./src/utils/errorHandler");

app.use((req, res, next) => {
    const error = new Error("Recource not found!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    handleError(error, res);
})

app.listen(port, () => {
    console.log(`API is ready on http://localhost:${port}`);
});