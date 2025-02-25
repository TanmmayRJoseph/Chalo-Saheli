import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!; // Ensure this is defined in .env file

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in the .env file");
}

// Use a global variable to prevent multiple connections in development
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Disable buffering of commands to prevent memory leaks
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("🔥 MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Error Connecting to MongoDB:", error);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
