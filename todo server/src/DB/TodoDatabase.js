import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Load .env file

async function connectToDatabase() {
    try {
        console.log("🔍 URI from .env:", process.env.MONGO_URI);

        let connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected:", connection.connection.name);
    } catch (error) {
        console.log(" DB connection error:", error);
    }
}

export { connectToDatabase };
