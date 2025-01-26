import mongoose from "mongoose";

const MONGODB_URI : any  = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

const connectToDatabase = async () => {
  try {
      await mongoose.connect(MONGODB_URI);
      console.log("Connected to the db");
  } catch (err) {
      console.error("Failed to connect to the db", err);
  }
};

export default connectToDatabase;