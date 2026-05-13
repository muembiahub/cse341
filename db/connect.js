require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    await client.db("admin").command({ ping: 1 });
    console.log('✅ Ping successful');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

//  variable for database connection
const database = client.db('cse341');
const contactsCollection = database.collection('contacts');

module.exports = { client, connectDB, database, contactsCollection };