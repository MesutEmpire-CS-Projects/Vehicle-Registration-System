import { Request, Response, NextFunction, Application } from "express";
const redis = require('redis')
require('dotenv').config()

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });
  
  redisClient.on('error', (error:any) => {
    console.error(error);
  });

  
redisClient.connect()

const dataCache = (req: Request, res: Response, next: NextFunction)=>{
    console.log('Arrived middleware')
    const finalPath = req.path.replace("/", "");
    console.log(finalPath)
    
    redisClient.get(`${finalPath}`)
    .then((data:any) => {
            console.log('data from redis : ')
            console.log(data)
            if(data !== null){
                res.json(JSON.parse(data));
            }else{
                next()
            }
        }
    )
    .catch((error:any)=>{
        res.status(500).json(error)
    })
    
}

module.exports = {redisClient,dataCache}