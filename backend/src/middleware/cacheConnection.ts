import { Request, Response, NextFunction, Application } from "express";
const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("error", (error: any) => {
  console.error(error);
});

redisClient.connect();

const dataCache = (req: Request, res: Response, next: NextFunction) => {
  const table = req.params.type;
  redisClient
    .get(table)
    .then((data: any) => {
      if (data !== null) {
        console.log("CACHE HIT ");
        res.json(JSON.parse(data));
      } else {
        console.log("CACHE MISS ");
        next();
      }
    })
    .catch((error: any) => {
      res.status(500).json(error);
    });
};

module.exports = { redisClient, dataCache };
