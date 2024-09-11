import { MongoClient } from "mongodb";

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin

  if (req.method === "GET") {
    
    try {
      const client = new MongoClient(process.env.DATABASE_URL);
      const dbName = "mcqera";
      await client.connect({ useUnifiedTopology: true, useNewUrlParser: true });
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      
      const collection = db.collection("courses");
      const courseObj = await collection.find({}).toArray();// this is course object from databse
      res.status(200).json(courseObj);
      return res.end();

    } catch (error) {
      res.status(200).json([]);
      return res.end();
    }
  };
}
