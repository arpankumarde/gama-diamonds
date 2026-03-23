import mongoose from "mongoose";

async function connectToDatabase(): Promise<void> {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error("MONGO_URI is not defined in environment variables");
        process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
}

export default connectToDatabase;