import { MongoClient } from "mongodb";

export default async (req, res) => {

  try {
    const client = new MongoClient(process.env.DATABASE_URL);
    const dbName = "mcqera";
    await client.connect({ useUnifiedTopology: true, useNewUrlParser: true });
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    
    const collection = db.collection("courses");
    const findResult = await collection.find({}).toArray();
    res.status(200).json(findResult);
    return res.end();

  } catch (error) {
    console.log(error)
    res.status(200).json([]);
    return res.end();
  }
};
