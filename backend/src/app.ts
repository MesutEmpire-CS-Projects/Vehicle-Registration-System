import { Request, Response, NextFunction, Application } from "express";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router/router");
require("dotenv").config();

const app: Application = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.method + "------->" + req.url);
    next();
});

//Router
app.use("/api", router);

app.listen(process.env.PORT, () => {
    console.log("Listening in PORT: " + process.env.PORT);
});
