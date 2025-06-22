import bodyParser from "body-parser";
import express from "express";
import { connectToDatabase } from "./src/DB/TodoDatabase.js";
import { TaskRouter } from "./src/routes/taskroutes.js";
import dotenv from 'dotenv'

import cors from "cors"
dotenv.config()
let Server = express()
Server.use(bodyParser.json())
Server.use(cors())
connectToDatabase()
Server.use("/api",TaskRouter)
Server.listen(5000,()=>
{
    console.log("Server Started")
})