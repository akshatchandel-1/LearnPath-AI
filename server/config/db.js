const mongoose = require('mongoose');

let mongoServer = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  try {
    let mongoUri = process.env.MONGO_URI;

    if (process.env.NODE_ENV === 'test' || !mongoUri || mongoUri === 'embedded') {
      if (!mongoServer) {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongoServer = await MongoMemoryServer.create();
      }
      mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      return conn;
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });

    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    try {
      if (!mongoServer) {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongoServer = await MongoMemoryServer.create();
      }
      const mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      return conn;
    } catch (e) {
      console.error(`Fatal: Unable to start embedded database: ${e.message}`);
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
