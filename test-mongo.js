const { MongoClient } = require("mongodb");

async function test() {
  const uri = "mongodb+srv://Anshu:Anshu123@plaksha.nd6kmql.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

test();