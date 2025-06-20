import express from "express"
import { AddTask, DeleteTask, fetchTask, UpdateTask } from "../controller/TodoController.js"


let TaskRouter = express.Router()


TaskRouter.post("/addtask", AddTask)
TaskRouter.get("/fetchtask", fetchTask)
TaskRouter.put("/updatetask", UpdateTask)
TaskRouter.post("/deletetask", DeleteTask)
export{TaskRouter}