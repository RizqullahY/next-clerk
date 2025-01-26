import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

// Deklarasi tipe untuk properti global
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      };
    }
  }
}

// Inisialisasi global.mongoose
globalThis.mongoose  = globalThis.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (globalThis.mongoose.conn) {
    return globalThis.mongoose.conn;
  }

  if (!globalThis.mongoose.promise) {
    globalThis.mongoose.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => mongoose.connection);
  }

  try {
    globalThis.mongoose.conn = await globalThis.mongoose.promise;
  } catch (err) {
    console.error("Database connection error:", err);
    throw new Error("Failed to connect to database");
  }

  return globalThis.mongoose.conn;
}
