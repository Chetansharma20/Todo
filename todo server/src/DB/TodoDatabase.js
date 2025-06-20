import mongoose from "mongoose";

let todoDb = "mongodb://localhost:27017/todo-db"

async function connectToDatabase() 
{
    try
    {
        let connection = await mongoose.connect(todoDb)
        console.log("Database connected", connection.connection.name)
    }
    catch(error)
    {
        console.log(error)
    }
    
}
export {connectToDatabase}