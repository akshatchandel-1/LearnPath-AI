const mongoose = require('mongoose');

let mongoServer = null;

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri || mongoUri === 'embedded') {
      console.log('Initializing embedded In-Memory MongoDB server...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log(`✓ Connected to In-Memory MongoDB at: ${mongoUri}`);
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    if (process.env.MONGO_URI && process.env.MONGO_URI !== 'embedded') {
      console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    }

    return conn;
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    // If external Mongo fails, fallback to embedded memory server
    try {
      console.log('Fallback: Launching embedded MongoMemoryServer...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`✓ Fallback MongoDB Connected at: ${mongoUri}`);
      return conn;
    } catch (e) {
      console.error(`✗ Fatal: Unable to start embedded database: ${e.message}`);
      process.exit(1);
    }
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

module.exports = { connectDB, disconnectDB };
