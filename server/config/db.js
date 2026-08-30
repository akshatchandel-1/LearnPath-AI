const mongoose = require('mongoose');

/**
 * Global MongoDB connection cache for Vercel Serverless execution.
 * Prevents connection churn and reuses warm connections across lambda invocations.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // If already connected, return cached connection immediately
  if (cached.conn && cached.conn.readyState === 1) {
    return cached.conn;
  }

  const mongoUri = process.env.MONGO_URI;

  if (process.env.NODE_ENV === 'test' || !mongoUri || mongoUri === 'embedded') {
    if (!process.env.VERCEL) {
      if (!cached.promise) {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        cached.promise = MongoMemoryServer.create().then(srv => {
          return mongoose.connect(srv.getUri(), {
            bufferCommands: false,
          });
        });
      }
      try {
        cached.conn = await cached.promise;
        return cached.conn;
      } catch (e) {
        cached.promise = null;
        console.error(`Embedded DB Error: ${e.message}`);
        throw e;
      }
    } else {
      throw new Error('MONGO_URI environment variable is required in cloud production');
    }
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Prevents Mongoose from buffering queries for 10s on connection failure
      serverSelectionTimeoutMS: 5000, // Timeout fast if Atlas cluster is unreachable
      connectTimeoutMS: 5000,
      maxPoolSize: 10, // Maintain up to 10 socket connections per lambda
      socketTimeoutMS: 15000,
    };

    cached.promise = mongoose.connect(mongoUri, opts).then((mongooseInstance) => {
      console.log('✅ Connected to MongoDB successfully');
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null; // Reset promise on error so subsequent requests can retry
      console.error(`MongoDB Connection Error: ${err.message}`);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
};

const disconnectDB = async () => {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
};

module.exports = { connectDB, disconnectDB };
